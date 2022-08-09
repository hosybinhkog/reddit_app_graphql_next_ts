import { Box, Button, CircularProgress, Flex, Heading } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import InputField from "../components/InputField";
import Layout from "../components/Layout";
import Wrapper from "../components/Wrapper";
import { CreatePostInput } from "../generated/graphql";
import { useCheckAuth } from "../utils/useCheckAuth";

const CreatePost = () => {
  const initialValues: CreatePostInput = {
    text: "",
    title: "",
  };
  const handleSubmitCreateNewPost = async (values: CreatePostInput) => {};
  const { data, loading: authLoading } = useCheckAuth();

  if (authLoading || (!authLoading && !data?.me)) {
    return (
      <Flex justifyContent={"center"} alignItems="center" w="100%" h="100vh">
        <CircularProgress />
      </Flex>
    );
  } else {
    return (
      <Layout>
        <Wrapper large>
          <Heading as="h2" size="xl" mb={10}>
            Create New Post
          </Heading>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmitCreateNewPost}
          >
            {({ isSubmitting }) => (
              <Form>
                <InputField name="title" placeholder="Title" label="Title" />
                <InputField
                  textarea
                  name="text"
                  placeholder="Text"
                  label="Text"
                />
                <Button
                  colorScheme="linkedin"
                  mt={6}
                  type="submit"
                  isLoading={isSubmitting}
                >
                  Create
                </Button>
              </Form>
            )}
          </Formik>
        </Wrapper>
      </Layout>
    );
  }
};

export default CreatePost;
