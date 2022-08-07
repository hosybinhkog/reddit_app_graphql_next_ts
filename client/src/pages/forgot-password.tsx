import {
  Box,
  Button,
  CircularProgress,
  FormErrorMessage,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import {
  ForgotPasswordInput,
  useForgotPasswordMutation,
} from "../generated/graphql";
import { useCheckAuth } from "../utils/useCheckAuth";

const initialValues: ForgotPasswordInput = {
  email: "",
};

const ForgotPassword = () => {
  const { data: _dataCheckAuth, loading } = useCheckAuth();
  const toast = useToast();
  const [forgotUser, { data, error }] = useForgotPasswordMutation();

  const handleSubmitForgotPassword = async (values: ForgotPasswordInput) => {
    const reponse = await forgotUser({
      variables: {
        forgotPasswordInput: values,
      },
    });

    if (reponse.data?.forgotPassword) {
      toast({
        title: "Check email",
        status: "warning",
        duration: 3000,
        isClosable: true,
        colorScheme: "messenger",
      });

      values.email = "";
    }
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {data ? (
            <>
              <Text mt={20} align={"center"} colorScheme={"teal"}>
                Please check your email!!!
              </Text>
            </>
          ) : (
            <Box p={4}>
              <Heading textAlign={"center"} mt={10} as={"h1"}>
                Forgot Password
              </Heading>
              <Wrapper>
                <Formik
                  onSubmit={handleSubmitForgotPassword}
                  initialValues={initialValues}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <InputField
                        name="email"
                        label="Email"
                        placeholder="hosybinh@gmail.com"
                      />
                      {error && (
                        <FormErrorMessage>{error.message}</FormErrorMessage>
                      )}
                      <Button
                        type="submit"
                        colorScheme={"linkedin"}
                        mt={4}
                        isLoading={isSubmitting}
                      >
                        Sent
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Wrapper>
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default ForgotPassword;
