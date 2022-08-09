import { Box, Button, Flex, Heading, useToast } from "@chakra-ui/react";
import NextLink from "next/link";
import {
  MeDocument,
  MeQuery,
  useLogoutMutation,
  useMeQuery,
} from "../generated/graphql";

const NavBar = () => {
  const { data } = useMeQuery();
  const toast = useToast();

  const [logoutUser, { loading, data: _dataLogout, error: _err }] =
    useLogoutMutation();

  const handleLogout = async () => {
    await logoutUser({
      update(cache, { data }) {
        if (data?.logout) {
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: {
              me: null,
            },
          });

          toast({
            title: "Logout sucess",
            status: "success",
            duration: 3000,
            isClosable: true,
            colorScheme: "messenger",
          });
        }
      },
    });
  };

  return (
    <Box
      bg="WindowFrame"
      sx={{
        justifyContent: "center",
        display: "flex",
        padding: "0 20px",
        alignItems: "center",
        height: "70px",
        minWidth: "100%",
        maxWidth: "1920px",
      }}
    >
      <Flex w="100%" maxW="1200px" justifyContent="space-between">
        <Heading as="h3">
          <NextLink href={"/"}>
            <a href="/">Reddit App</a>
          </NextLink>
        </Heading>

        <Flex gap={4} align="center">
          {data?.me?.username ? (
            <>
              <Heading sx={{ fontSize: "1.2rem" }} as="span">
                {data.me.username}
              </Heading>
              <Button isLoading={loading} onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button>
                <NextLink href={"/login"}>Login</NextLink>
              </Button>

              <Button>
                <NextLink href={"/register"}>Register</NextLink>
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavBar;
