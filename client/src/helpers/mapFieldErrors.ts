import { FieldError } from "./../generated/graphql";

export const mapFieldErrors = (fieldErrors: FieldError[]) => {
  return fieldErrors.reduce((acc, error) => {
    return {
      ...acc,
      [error.field]: [error.message],
    };
  }, {});
};
