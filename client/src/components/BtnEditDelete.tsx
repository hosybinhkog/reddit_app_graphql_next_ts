import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, IconButton } from "@chakra-ui/react";
import React from "react";

const BtnEditDelete = () => {
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
        colorScheme="blue"
        aria-label="Delete post"
        icon={<DeleteIcon />}
      />
      <IconButton
        colorScheme="red"
        aria-label="Edit post"
        icon={<EditIcon />}
      />
    </Box>
  );
};

export default BtnEditDelete;
