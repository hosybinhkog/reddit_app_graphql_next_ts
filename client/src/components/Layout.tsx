import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box
      sx={{
        justifyContent: "center",
        display: "flex",
        padding: "0 20px",
        alignItems: "center",
        minWidth: "100%",
        maxWidth: "1920px",
      }}
    >
      <Box maxW="1200px" padding="20px 0" w={"100%"}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
