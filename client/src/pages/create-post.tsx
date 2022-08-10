import {
  Button,
  CircularProgress,
  Flex,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import Router from "next/router";
import InputField from "../components/InputField";
import Layout from "../components/Layout";
import Wrapper from "../components/Wrapper";
import { CreatePostInput, useCreatePostMutation } from "../generated/graphql";
import { useCheckAuth } from "../utils/useCheckAuth";

const CreatePost = () => {
  const initialValues: CreatePostInput = {
    text: "",
    title: "",
  };

  const [createPost, _] = useCreatePostMutation();
  const toast = useToast();

  const handleSubmitCreateNewPost = async (values: CreatePostInput) => {
    const response = await createPost({
      variables: {
        createPostInput: values,
      },
      update(cache, { data }) {
        console.log("Update function");

        cache.modify({
          fields: {
            getPosts(existing) {
              console.log("existing modify ", { existing });
              if (data?.createPost.post) {
                const newPostRef = cache.identify(data.createPost.post);
                console.log("New post ref", { newPostRef });

                const newPostAfterCreateNewPost = {
                  ...existing,
                  totalCount: existing.totalCount + 1,
                  paninatedPosts: [
                    { __ref: `Post:${newPostRef}` },
                    ...existing.paninatedPosts,
                  ],
                };

                console.log("newPostAfterCreatedNewPost", {
                  newPostAfterCreateNewPost,
                });

                return newPostAfterCreateNewPost;
              }
            },
          },
        });
      },
    });

    console.log(response);

    if (response.data?.createPost.success) {
      toast({
        title: "Create post successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
        colorScheme: "messenger",
      });

      Router.push("/");
    }
  };
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
