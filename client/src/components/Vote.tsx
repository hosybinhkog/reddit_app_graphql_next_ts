import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import { useState } from "react";
import {
  PostAndUserInfoFragmentsFragment,
  useVotePMutation,
  VoteType,
} from "../generated/graphql";

interface VoteProps {
  post: PostAndUserInfoFragmentsFragment;
}

const Vote = ({ post }: VoteProps) => {
  const [votePost, { loading }] = useVotePMutation();
  const [loadingState, setLoadingState] = useState<
    "upvote-loading" | "downvote-loading" | "not-loading"
  >("not-loading");

  const handleDownVote = async () => {
    setLoadingState("downvote-loading");
    await votePost({
      variables: {
        postId: post.id,
        inputVoteValue: VoteType.Downvote,
      },
    });
    setLoadingState("not-loading");
  };

  const handleUpVote = async () => {
    setLoadingState("upvote-loading");
    await votePost({
      variables: {
        postId: post.id,
        inputVoteValue: VoteType.Upvote,
      },
    });
    setLoadingState("not-loading");
  };

  return (
    <Flex gap={5} mt={5} alignItems="center">
      <IconButton
        size="lg"
        rounded={"full"}
        onClick={handleUpVote.bind(this)}
        isLoading={loading && loadingState === "upvote-loading"}
        icon={<ChevronUpIcon fontSize={"2xl"} />}
        aria-label="right icon"
      />
      <Text size={"lg"} color={"teal.200"}>
        {post.poins}
      </Text>
      <IconButton
        rounded={"full"}
        size={"lg"}
        isLoading={loading && loadingState === "downvote-loading"}
        onClick={handleDownVote.bind(this)}
        icon={<ChevronDownIcon fontSize={"2xl"} />}
        aria-label="right icon"
      />
    </Flex>
  );
};

export default Vote;
