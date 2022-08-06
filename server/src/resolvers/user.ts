import { COOKIE_NAME } from "./../constants";
import { Context } from "./../types/Context";
import { LoginInput } from "./../types/LoginInput";
import { validateRegisterInput } from "./../utils/validateRegisterInput";
import { RegisterInput } from "./../types/RegisterInput";
import { UserMutationResponse } from "./../types/UserMutationResponse";
import { User } from "../entities/User";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import argon2 from "argon2";

@Resolver()
export class UserResolver {
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
    try {
      const existingUser = usernameOrEmail.includes("@")
        ? await User.findOne({ where: { email: usernameOrEmail } })
        : await User.findOne({ where: { username: usernameOrEmail } });

      if (!existingUser) {
        return {
          code: 404,
          success: false,
          message: "username or email not found",
          errors: [
            {
              field: "usernameOrEmail",
              message: "Username or email not match",
            },
          ],
        };
      }

      const isMatchPassword = await argon2.verify(
        existingUser.password,
        password
      );

      if (!isMatchPassword) {
        return {
          code: 400,
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
}
