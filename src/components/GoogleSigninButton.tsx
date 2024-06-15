"use client";

import { signIn, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { axiosInstance } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { setUser } from "@/lib/store/features/userSlice";
import { useAppDispatch } from "@/lib/store/hooks";

export default function GoogleSigninButton() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleGoogleLogin = async () => {
    try {
      await signIn("google");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const saveUserData = async () => {
      try {
        const userData = {
          name: session?.user?.name,
          email: session?.user?.email,
          profilePicture: session?.user?.image,
        };

        const { data } = await axiosInstance.post(
          "/api/auth/google-signup",
          userData
        );

        console.log(data);

        if (data?.success) {
          localStorage.setItem("auth", JSON.stringify(data?.user));
          localStorage.setItem("token", JSON.stringify(data.token));
          dispatch(setUser(data.user));
          if (!data?.user?.role) {
            router.push("/role");
          } else {
            router.push("/");
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (status === "authenticated" && session?.user) {
      saveUserData();
    }
  }, [status, session, router, dispatch]);

  return (
    <div className="flex justify-center items-center gap-3">
      <button
        onClick={handleGoogleLogin}
        className="flex items-center gap-2 border-2 rounded-md p-2"
      >
        <GoogleIcon /> Google
      </button>
    </div>
  );
}
