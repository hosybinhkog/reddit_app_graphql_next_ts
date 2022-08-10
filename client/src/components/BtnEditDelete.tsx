import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, IconButton } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

interface BtnEditDeleteProps {
  postId: number | string;
  onClickDelete?: () => void;
}

const BtnEditDelete = ({ postId, onClickDelete }: BtnEditDeleteProps) => {
  return (
    <Box
      sx={{
        justifyContent: "flex-end",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
      }}
      mr={6}
      mt={6}
    >
      <IconButton
        colorScheme="red"
        onClick={onClickDelete}
        aria-label="Delete post"
        icon={<DeleteIcon />}
      />
      <NextLink href={`/post/edit/${postId}`}>
        <IconButton
          colorScheme="linkedin"
          aria-label="Edit post"
          icon={<EditIcon />}
        />
      </NextLink>
    </Box>
  );
};

export default BtnEditDelete;
