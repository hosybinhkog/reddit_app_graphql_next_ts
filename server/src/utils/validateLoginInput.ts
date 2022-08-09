import { LoginInput } from "./../types/LoginInput";
import { FieldError } from "./../types/FieldError";

interface ErrorsValidate {
  message: string;
  errors: FieldError[];
}

export const validateLoginInput = (loginInput: LoginInput) => {
  let checkError = 0;
  const errors: ErrorsValidate = {
    message: "",
    errors: [],
  };

  if (loginInput.usernameOrEmail.length <= 3) {
    checkError++;

    errors.errors = [
      ...errors.errors,
      {
        field: "usernameOrEmail",
        message: "username length must be geater than 3",
      },
    ];
  }

  if (loginInput.password.length <= 6) {
    checkError++;
    errors.errors = [
      ...errors.errors,
      {
        field: "password",
        message: "password length must be geater than 6",
      },
    ];
  }

  if (checkError) {
    return errors;
  }

  return null;
};
