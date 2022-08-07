import { ChakraProvider } from "@chakra-ui/react";

import { ApolloProvider } from "@apollo/client";
import { AppProps } from "next/app";
import NavBar from "../components/NavBar";
import { useApollo } from "../lib/apolloClient";
import theme from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider theme={theme}>
        <NavBar />
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
