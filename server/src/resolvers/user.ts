import { validateLoginInput } from "./../utils/validateLoginInput";
import { Post } from "./../entities/Post";
import { ChangePasswordInput } from "./../types/ChangePasswordInput";
import { TokenModel } from "./../models/Token";
import { sendMail } from "./../utils/sendMail";
import { ForgotPasswordInput } from "./../types/ForgotPasswordInput";
import { COOKIE_NAME } from "./../constants";
import { Context } from "./../types/Context";
import { LoginInput } from "./../types/LoginInput";
import { validateRegisterInput } from "./../utils/validateRegisterInput";
import { RegisterInput } from "./../types/RegisterInput";
import { UserMutationResponse } from "./../types/UserMutationResponse";
import { User } from "../entities/User";
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import argon2 from "argon2";
import { v4 as uuidv4 } from "uuid";

@Resolver((_of) => User)
export class UserResolver {
  @FieldResolver()
  email(@Root() root: User, @Ctx() { req }: Context) {
    return req.session.userId === root.id ? root.email : "";
  }

  @FieldResolver((_return) => [Post])
  async posts(@Root() root: User) {
    return await Post.find({ where: { userId: root.id as string } });
  }

  @Query((_returns) => User, { nullable: true })
  async me(@Ctx() { req }: Context): Promise<User | null> {
    try {
      if (req.session.userId) {
        const user = await User.findOne({ where: { id: req.session.userId } });

        if (user) {
          return user;
        }

        return null;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  @Mutation((_returns) => UserMutationResponse, { nullable: true })
  async register(
    @Arg("registerInput") { username, email, password }: RegisterInput,
    @Ctx() { req }: Context
  ): Promise<UserMutationResponse> {
    const validateRegisterInputError = validateRegisterInput({
      username,
      email,
      password,
    });

    if (validateRegisterInputError !== null) {
      return {
        code: 400,
        success: false,
        ...validateRegisterInputError,
      };
    }

    try {
      const existingUser = await User.findOne({
        where: [{ username }, { email }],
      });
      if (existingUser) {
        return {
          code: 400,
          success: false,
          message: "username or email is realdy",
          errors: [
            {
              field: existingUser.username === username ? "username" : "email",
              message:
                existingUser.username === username
                  ? "username is already"
                  : "email is already",
            },
          ],
        };
      }

      const hashPassword = await argon2.hash(password);

      const newUser = await User.create({
        username,
        email,
        password: hashPassword,
      });

      await newUser.save();

      req.session.userId = newUser.id;

      return {
        code: 200,
        message: "register successfully",
        success: true,
        user: newUser,
      };
    } catch (error) {
      return {
        code: 500,
        message: "server internal" + error.message,
        success: false,
      };
    }
  }

  @Mutation((_return) => UserMutationResponse, { nullable: true })
  async login(
    @Arg("loginInput") { usernameOrEmail, password }: LoginInput,
    @Ctx() { req }: Context
  ): Promise<UserMutationResponse> {
    const ValidateLoginInput = validateLoginInput({
      usernameOrEmail,
      password,
    });

    if (ValidateLoginInput !== null) {
      return {
        code: 400,
        success: false,
        ...ValidateLoginInput,
      };
    }

    try {
      const existingUser = usernameOrEmail.includes("@")
        ? await User.findOne({ where: { email: usernameOrEmail } })
        : await User.findOne({ where: { username: usernameOrEmail } });

      if (!existingUser) {
        return {
          code: 404,
          success: false,
          message: "username or email not found",
        };
      }

      const isMatchPassword = await argon2.verify(
        existingUser.password,
        password
      );

      if (!isMatchPassword) {
        return {
          code: 404,
          success: false,
          message: "Username or password not match",
        };
      }

      req.session.userId = existingUser.id;

      return {
        code: 200,
        success: true,
        message: "Login successfully",
        user: existingUser,
      };
    } catch (error) {
      return {
        code: 500,
        message: "server is internal",
        user: undefined,
        success: false,
      };
    }
  }

  @Mutation((_retruns) => Boolean)
  logout(@Ctx() { req, res }: Context): Promise<Boolean> {
    return new Promise((resolve, _reject) => {
      res.clearCookie(COOKIE_NAME);
      req.session.destroy((err) => {
        if (err) {
          console.log("Session", err);
          resolve(false);
        }
        resolve(true);
      });
    });
  }

  @Mutation((_returns) => Boolean)
  async forgotPassword(
    @Arg("forgotPasswordInput") { email }: ForgotPasswordInput
  ): Promise<Boolean> {
    try {
      const user = await User.findOne({ where: { email } });

      if (user) {
        await TokenModel.findOneAndDelete({ userId: user.id });

        const token = uuidv4();
        const hashToken = await argon2.hash(token);

        const newToken = await new TokenModel({
          userId: user.id,
          token: hashToken,
        });

        await newToken.save();

        await sendMail(
          user.email,
          `<b>Hello ${user.username}</b> <p>Click <a href="http://localhost:3000/change-password?token=${token}&userId=${user.id}">Here</a> to changes password</p>`
        );
        return true;
      } else {
        return true;
      }
    } catch (error) {
      console.log("error forgot", error);
      return false;
    }
  }

  @Mutation((_returns) => UserMutationResponse)
  async changePassword(
    @Arg("token") token: string,
    @Arg("userId") userId: string,
    @Arg("changePasswordInput") { newPassword }: ChangePasswordInput,
    @Ctx() { req }: Context
  ): Promise<UserMutationResponse> {
    try {
      if (newPassword.length < 3) {
        return {
          code: 400,
          message: "invalid newPassword",
          success: false,
          errors: [
            {
              field: "newPassword",
              message: "password length > 3",
            },
          ],
        };
      }

      const resetPasswordToken = await TokenModel.findOne({ userId });
      if (!resetPasswordToken) {
        return {
          code: 404,
          message: "Exprise token",
          success: false,
        };
      }

      const resetPasswordTokenValid = await argon2.verify(
        resetPasswordToken.token,
        token
      );

      if (!resetPasswordTokenValid) {
        return {
          code: 400,
          success: false,
          message: "Token invalid",
        };
      }

      const userChangePassword = await User.findOne({
        where: { id: userId },
      });

      if (!userChangePassword) {
        return {
          code: 404,
          message: "not found user",
          success: false,
        };
      }

      userChangePassword.password = await argon2.hash(newPassword);
      await userChangePassword.save();
      await resetPasswordToken.deleteOne();

      req.session.userId = userChangePassword.id;

      return {
        code: 200,
        message: "change password successfully",
        success: true,
        user: userChangePassword,
      };
    } catch (error) {
      console.log("error change password" + error);
      return {
        code: 500,
        message: "server internal",
        success: false,
      };
    }
  }
}
