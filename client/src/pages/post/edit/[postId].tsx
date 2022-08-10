import { Button, CircularProgress, Flex, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import InputField from "../../../components/InputField";
import Layout from "../../../components/Layout";
import Wrapper from "../../../components/Wrapper";
import {
  UpdatePostInput,
  useGetPostQuery,
  useMeQuery,
  useUpdatePostMutation,
} from "../../../generated/graphql";

const EditPost = () => {
  const toast = useToast();
  const router = useRouter();

  const [updatePost, { data: _data }] = useUpdatePostMutation();
  const { data: meData, loading: meLoading } = useMeQuery();
  const { data: postData, loading: postLoading } = useGetPostQuery({
    variables: {
      id: router.query.postId as string,
    },
  });

  if (meLoading || postLoading) {
    return (
      <Flex w="100%" h="100vh" justifyContent={"center"} alignItems="center">
        <CircularProgress />
      </Flex>
    );
  }

  if (
    !meLoading &&
    !postLoading &&
    meData?.me?.id !== postData?.getPost?.userId
  ) {
    toast({
      title: "U only can edit your post",
      duration: 3000,
      position: "bottom",
      colorScheme: "messenger",
      status: "warning",
    });
    router.push("/");
  }

  const initialValues: UpdatePostInput = {
    text: postData?.getPost?.text || "",
    title: postData?.getPost?.title || "",
    id: router.query.postId as string,
  };

  const handleSubmitUpdatePost = async (values: UpdatePostInput) => {
    const response = await updatePost({
      variables: {
        updatePostInput: values,
      },
    });

    if (response.data?.updatePost.success) {
      toast({
        title: "Update post success!",
        duration: 3000,
        position: "bottom",
        colorScheme: "messenger",
        status: "success",
      });
      router.push("/");
    }
  };

  return (
    <>
      {!meLoading &&
      !postLoading &&
      meData?.me?.id === postData?.getPost?.userId ? (
        <Layout>
          <Wrapper large>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmitUpdatePost}
            >
              {({ isSubmitting }) => (
                <Form>
                  <InputField name="title" label="Title" placeholder="title" />
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
                    Update post
                  </Button>
                </Form>
              )}
            </Formik>
          </Wrapper>
        </Layout>
      ) : null}
    </>
  );
};

export default EditPost;
