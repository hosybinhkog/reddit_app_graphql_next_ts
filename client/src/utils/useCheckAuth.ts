import React from "react";
import { useRouter } from "next/router";
import { useMeQuery } from "../generated/graphql";

export const useCheckAuth = () => {
  const router = useRouter();

  const { data, loading } = useMeQuery();

  React.useEffect(() => {
    if (
      !loading &&
      data?.me &&
      (router.route === "/login" ||
        router.route === "/register" ||
        router.route === "/forgot-password" ||
        router.route === "/change-password")
    ) {
      router.replace("/");
    }
  }, [loading, data, router]);

  return { data, loading };
};
