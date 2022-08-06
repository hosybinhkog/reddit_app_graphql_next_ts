import { FieldError } from "./../types/FieldError";
import { RegisterInput } from "./../types/RegisterInput";

interface ErrorsValidate {
  message: string;
  errors: FieldError[];
}

export const validateRegisterInput = (registerInput: RegisterInput) => {
  let checkError = 0;
  const errors: ErrorsValidate = {
    message: "",
    errors: [],
  };

  if (!registerInput.email.includes("@")) {
    checkError++;

    errors.message = errors.message + "Invalid email";
    errors.errors = [
      ...errors.errors,
      {
        field: "email",
        message: "Email must include @ symbol",
      },
    ];
  }

  if (registerInput.username.length <= 3) {
    checkError++;

    errors.message = errors.message + "Invalid username";
    errors.errors = [
      ...errors.errors,
      {
        field: "username",
        message: "username length must be geater than 3",
      },
    ];
  }

  if (registerInput.password.length <= 6) {
    checkError++;

    errors.message = errors.message + "Invalid password";
    errors.errors = [
      ...errors.errors,
      {
        field: "password",
        message: "password length must be geater than 6",
      },
    ];
  }

  if (registerInput.username.includes("@")) {
    checkError++;

    if ("username" in errors.errors) {
      errors.errors.map((error) =>
        error.field === "username"
          ? {
              message: error.message.concat("username is not include @"),
              field: "username",
            }
          : error
      );
    } else {
      errors.errors.push({
        message: "Username is not include @",
        field: "username",
      });
    }
  }

  if (checkError) {
    return errors;
  }

  return null;
};
