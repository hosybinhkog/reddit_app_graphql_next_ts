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
import {
  LoginInput,
  MeDocument,
  MeQuery,
  useLoginMutation,
} from "../generated/graphql";
import { mapFieldErrors } from "../helpers/mapFieldErrors";
import LinkNext from "next/link";

const Login = () => {
  const [loginUser, { error }] = useLoginMutation();

  const handleSubmitLogin = async (
    values: LoginInput,
    { setErrors }: FormikHelpers<LoginInput>
  ) => {
    const response = await loginUser({
      variables: {
        loginInput: values,
      },
      update(cache, { data }) {
        console.log({ data });
        if (data?.login?.success) {
          console.log("update");
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: {
              me: data.login.user,
            },
          });
        }
      },
    });

    if (response.data?.login?.errors) {
      const errors = mapFieldErrors(response.data.login.errors);
      console.log(errors);
      setErrors({
        ...errors,
      });
    } else if (response.data?.login?.user) {
      Router.push("/");
    }
  };

  const initialValues: LoginInput = {
    usernameOrEmail: "",
    password: "",
  };

  return (
    <Box p={4}>
      <Heading textAlign={"center"} mt={10} as={"h1"}>
        Login
      </Heading>
      <Wrapper>
        <Formik onSubmit={handleSubmitLogin} initialValues={initialValues}>
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name="usernameOrEmail"
                label="Username Or Email"
                placeholder="hosybinh..."
              />
              <InputField name="password" label="Password" type="password" />
              {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
              <Button
                type="submit"
                colorScheme={"linkedin"}
                mt={4}
                isLoading={isSubmitting}
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
        <Text mt={3}>
          Now to Reddit App ?{" "}
          <LinkNext href="/register">
            <Link color="teal.200">Register</Link>
          </LinkNext>
        </Text>
      </Wrapper>
    </Box>
  );
};

export default Login;
