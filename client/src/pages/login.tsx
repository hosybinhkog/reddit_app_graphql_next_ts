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
import LinkNext from "next/link";
import Router from "next/router";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import {
  LoginInput,
  MeDocument,
  MeQuery,
  useLoginMutation,
} from "../generated/graphql";
import { mapFieldErrors } from "../helpers/mapFieldErrors";
import { useCheckAuth } from "../utils/useCheckAuth";

const Login = () => {
  const { data, loading } = useCheckAuth();

  const [loginUser, { data: dataLogin, error: _ }] = useLoginMutation();

  const handleSubmitLogin = async (
    values: LoginInput,
    { setErrors }: FormikHelpers<LoginInput>
  ) => {
    const response = await loginUser({
      variables: {
        loginInput: values,
      },
      update(cache, { data }) {
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
      setErrors({
        ...errors,
      });
    } else if (response.data?.login?.user) {
      toast({
        title: "Login successfully.",
        description: "Hello " + response.data?.login?.user?.username,
        status: "success",
        duration: 3000,
        isClosable: true,
        colorScheme: "messenger",
      });
      Router.push("/");
    }
  };

  const initialValues: LoginInput = {
    usernameOrEmail: "",
    password: "",
  };

  const toast = useToast();

  return (
    <>
      {loading || (!loading && data?.me) ? (
        <>
          <CircularProgress />
        </>
      ) : (
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
                    {dataLogin?.login?.code === 400
                      ? dataLogin.login.message
                      : ""}
                  </Text>
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
            <Text mt={3}>
              Forgot password ?{" "}
              <LinkNext href="/forgot-password">
                <Link color="teal.200">Click here</Link>
              </LinkNext>
            </Text>
          </Wrapper>
        </Box>
      )}
    </>
  );
};

export default Login;
