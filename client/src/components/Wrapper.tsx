import { Box } from "@chakra-ui/react";
import React from "react";

interface IWrapperProps {
  children: React.ReactNode;
  large?: boolean;
}

const Wrapper = ({ children, large }: IWrapperProps) => {
  return (
    <Box maxW={large ? "800px" : "400px"} w="100%" mt={8} mx="auto">
      {children}
    </Box>
  );
};

export default Wrapper;
