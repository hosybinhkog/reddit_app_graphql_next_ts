import { NetworkStatus } from "@apollo/client";
import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Spinner,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import Link from "next/link";
import { format } from "timeago.js";
import BtnEditDelete from "../components/BtnEditDelete";
import { GetPostsDocument, useGetPostsQuery } from "../generated/graphql";
import { addApolloState, initializeApollo } from "../lib/apolloClient";

const limit = 5;

const Index = () => {
  const {
    data,
    loading,
    error: _error,
    fetchMore,
    networkStatus,
  } = useGetPostsQuery({
    variables: {
      limit,
    },
    notifyOnNetworkStatusChange: true,
  });

  console.log("CURSOR", data?.getPosts?.cursor);

  const loadMorePost = async () =>
    await fetchMore({ variables: { cursor: data?.getPosts?.cursor } });

  const loadingMorePost = networkStatus === NetworkStatus.fetchMore;

  return (
    <>
      {loading && !loadMorePost ? (
        <Flex
          alignItems={"center"}
          justifyContent="center"
          w={"100%"}
          h="100vh"
        >
          <Spinner />
        </Flex>
      ) : (
        <Box
          mt={10}
          w="100%"
          maxW="1920px"
          display={"flex"}
          flexDirection="column"
          justifyContent="center"
        >
          <Box
            w="100%"
            maxW={"1200px"}
            margin="20px auto"
            display={"flex"}
            gap="1.5rem"
            flexDirection={"column"}
            flexWrap="wrap"
          >
            <Flex maxW={"300px"} height="40px" w="100%">
              <Tooltip
                label="Add new post"
                fontSize={14}
                closeDelay={3}
                placement="top"
              >
                <span>
                  <Link href={"/create-post"}>
                    <IconButton icon={<AddIcon />} aria-label="add new post" />
                  </Link>
                </span>
              </Tooltip>
            </Flex>
            <Heading mb={10} as="h2" size="2xl" textAlign={"center"}>
              All posts
            </Heading>
            {data?.getPosts?.paninatedPosts.map((post, index) => (
              <Flex
                key={index}
                flexDirection="column"
                w="100%"
                maxW="100%"
                p={2}
                padding={4}
                borderColor="teal.400"
                borderWidth={1}
                borderRadius={6}
              >
                <Heading variant={"h2"} size="xl" mb={4}>
                  <Link href={`/post/${post.id}`}>{post.title}</Link>
                </Heading>
                <Text fontSize="xl" mb={1} noOfLines={3} minH="90px">
                  {post.text}
                </Text>
                <Text fontSize="sm">Author : {post.user?.username}</Text>
                <Text mb={2} fontSize="sm">
                  Created : {format(post.createdAt)}
                </Text>
                <BtnEditDelete />
              </Flex>
            ))}
          </Box>
          <Box display={"grid"} placeItems="center" m={5}>
            <Button
              maxW={"100px"}
              variant={"outline"}
              onClick={loadMorePost}
              hidden={!data?.getPosts?.hashMore}
              isLoading={loadingMorePost}
            >
              Load More
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export const getStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GetPostsDocument,
    variables: {
      limit,
    },
  });

  return addApolloState(apolloClient, {
    props: {},
  });
};

export default Index;
