import {
  Box,
  Button,
  CircularProgress,
  Heading,
  Link,
  Text,
  useToast,
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
import { useCheckAuth } from "../utils/useCheckAuth";

const initialValues: RegisterInput = {
  username: "",
  email: "",
  password: "",
};

const Register: React.FC = () => {
  const toast = useToast();
  const { data: _data, loading } = useCheckAuth();

  const [registerUser, { data: dataRegister, error: _, loading: _loading }] =
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
      toast({
        title: "Create account successfully.",
        description: "Hello " + response.data?.register?.user?.username,
        status: "success",
        duration: 3000,
        isClosable: true,
        colorScheme: "messenger",
      });
      Router.push("/");
    }
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <Box p={4}>
          <Heading textAlign={"center"} mt={10} as={"h1"}>
            Register
          </Heading>
          <Wrapper>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmitRegister}
            >
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
                  <InputField
                    name="password"
                    label="Password"
                    type="password"
                  />
                  <Text
                    mt={3}
                    fontSize="13px"
                    color="tomato"
                    colorScheme={"red"}
                  >
                    {dataRegister?.register?.code === 400
                      ? dataRegister.register.message
                      : ""}
                  </Text>
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
      )}
    </>
  );
};

export default Register;
