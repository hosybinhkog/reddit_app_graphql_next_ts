import {
  Alert,
  AlertIcon,
  CircularProgress,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { format } from "timeago.js";
import Layout from "../../components/Layout";
import {
  GetPostDocument,
  GetPostQuery,
  PostIdsDocument,
  PostIdsQuery,
  useGetPostQuery,
} from "../../generated/graphql";
import { addApolloState, initializeApollo } from "../../lib/apolloClient";
import { limit } from "../";

const PostDetails = () => {
  const query = useRouter();
  const { id } = query.query;

  const { loading, data, error } = useGetPostQuery({
    variables: {
      id: id as string,
    },
  });

  if (error && !loading) {
    <Alert status="error">
      <AlertIcon>{error.message}</AlertIcon>
    </Alert>;
  }

  if (!data?.getPost && !loading) {
    return (
      <Layout>
        <Heading as="h2" size="xl">
          Not found Post
        </Heading>
      </Layout>
    );
  }

  return (
    <>
      {loading ? (
        <Flex
          w={"100%"}
          h="100vh"
          justifyContent={"center"}
          alignItems="center"
        >
          <CircularProgress />
        </Flex>
      ) : (
        <Layout>
          <Heading as="h2" size="xl">
            {data?.getPost?.title}
          </Heading>
          <Text size={"sm"}>{data?.getPost?.text}</Text>
          <Flex mt={10} justifyContent={"flex-end"} flexDirection="column">
            <Text colorScheme={"blue"}>{format(data?.getPost?.createdAt)}</Text>
            <Text>Author: {data?.getPost?.user.username}</Text>
          </Flex>
        </Layout>
      )}
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query<PostIdsQuery>({
    query: PostIdsDocument,
    variables: { limit: limit },
  });

  return {
    paths: data.getPosts!.paninatedPosts.map((post) => ({
      params: { id: post.id as string },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo();

  await apolloClient.query<GetPostQuery>({
    query: GetPostDocument,
    variables: {
      id: params?.id as string,
    },
  });

  return addApolloState(apolloClient, {
    props: {},
  });
};

export default PostDetails;
