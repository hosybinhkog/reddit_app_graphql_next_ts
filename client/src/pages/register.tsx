import {
  Box,
  Button,
  FormErrorMessage,
  Heading,
  Link,
  Text,
} from "@chakra-ui/react";
import { Form, Formik, FormikHelpers } from "formik";
import Router from "next/router";
import React from "react";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";

import LinkNext from "next/link";

import {
  MeDocument,
  MeQuery,
  RegisterInput,
  useRegisterMutation,
} from "../generated/graphql";
import { mapFieldErrors } from "../helpers/mapFieldErrors";

const initialValues: RegisterInput = {
  username: "",
  email: "",
  password: "",
};

const Register: React.FC = () => {
  const [registerUser, { data: _, error, loading: _loading }] =
    useRegisterMutation();

  const handleSubmitRegister = async (
    values: RegisterInput,
    { setErrors }: FormikHelpers<RegisterInput>
  ) => {
    const response = await registerUser({
      variables: {
        registerInput: values,
      },
      update(query, { data }) {
        if (data?.register?.success) {
          query.writeQuery<MeQuery>({
            query: MeDocument,
            data: {
              me: data.register.user,
            },
          });
        }
      },
    });

    if (response.data?.register?.errors) {
      const errors = mapFieldErrors(response.data.register.errors);
      console.log(errors);
      setErrors({
        ...errors,
      });
    } else if (response.data?.register?.success) {
      Router.push("/");
    }
  };

  return (
    <Box p={4}>
      <Heading textAlign={"center"} mt={10} as={"h1"}>
        Register
      </Heading>
      <Wrapper>
        <Formik initialValues={initialValues} onSubmit={handleSubmitRegister}>
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name="username"
                label="Username"
                placeholder="hosybinh..."
              />
              <InputField
                name="email"
                label="Email"
                placeholder="hosybinh@gmail.com..."
                type={"email"}
              />
              <InputField name="password" label="Password" type="password" />
              {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
              <Button
                type="submit"
                colorScheme={"linkedin"}
                mt={4}
                isLoading={isSubmitting}
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
        <Text mt={3}>
          Already a redditor?{" "}
          <LinkNext href="/login">
            <Link color="teal.200">Login</Link>
          </LinkNext>
        </Text>
      </Wrapper>
    </Box>
  );
};

export default Register;