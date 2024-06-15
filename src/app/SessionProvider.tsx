"use client";

import { setUser } from "@/lib/store/features/userSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { SessionProvider } from "next-auth/react";

import { ReactNode, useEffect } from "react";

type NextAuthProviderProps = {
  children: ReactNode;
};

export const NextAuthProvider = ({ children }: NextAuthProviderProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = localStorage.getItem("auth");
    if (user) {
      dispatch(setUser(user));
    }
  }, [dispatch]);

  return <SessionProvider>{children}</SessionProvider>;
};
