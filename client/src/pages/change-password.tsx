import {
  Box,
  Button,
  CircularProgress,
  Flex,
  FormErrorMessage,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";

import {
  ChangePasswordInput,
  MeDocument,
  MeQuery,
  useChangePasswordMutation,
} from "../generated/graphql";
import { useCheckAuth } from "../utils/useCheckAuth";

const ChangePassword = () => {
  const { data: _dataCheckAuth, loading } = useCheckAuth();
  const initialValues: ChangePasswordInput = {
    newPassword: "",
  };

  const [changePasswordUser, { data: _data, error }] =
    useChangePasswordMutation();

  const router = useRouter();
  const toast = useToast();

  const handleSubmitChangePassword = async (values: ChangePasswordInput) => {
    const response = await changePasswordUser({
      variables: {
        changePasswordInput: values,
        token: (router.query.token as string) || "",
        userId: (router.query.userId as string) || "",
      },
      update(cache, { data }) {
        if (data?.changePassword.success) {
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: {
              me: data?.changePassword.user,
            },
          });
        }
      },
    });

    console.log(response);

    if (response.data?.changePassword.success) {
      toast({
        title: "Change password success",
        status: "success",
        duration: 3000,
        isClosable: true,
        colorScheme: "messenger",
      });

      router.push("/");
    } else {
      toast({
        title: "Change password failse" + response.data?.changePassword.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        colorScheme: "messenger",
      });
    }
  };

  return (
    <>
      {loading ? (
        <>
          <Flex w="100%" h="100vh" alignContent="center" alignItems={"center"}>
            <CircularProgress />
          </Flex>
        </>
      ) : (
        <Box p={4}>
          <Heading textAlign={"center"} mt={10} as={"h1"}>
            Change password
          </Heading>
          <Wrapper>
            <Formik
              onSubmit={handleSubmitChangePassword}
              initialValues={initialValues}
            >
              {({ isSubmitting }) => (
                <Form>
                  <InputField
                    name="newPassword"
                    label="New Password"
                    type="password"
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
                    Change password
                  </Button>
                </Form>
              )}
            </Formik>
          </Wrapper>
        </Box>
      )}
    </>
  );
};

export default ChangePassword;
