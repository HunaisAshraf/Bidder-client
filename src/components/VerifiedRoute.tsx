"use client";

import { useAppSelector } from "@/lib/store/hooks";
import { axiosInstance } from "@/utils/constants";
import React, { useState } from "react";
import Spinner from "./Spinner";

const VerifiedRoute = ({ children }: { children: any }) => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = useAppSelector((state) => state.users.user);

  const resendMail = async () => {
    try {
      setSuccess(false);
      setLoading(true);
      console.log("aaaaaaaaaaaa");

      let { data } = await axiosInstance.get("/api/v1/auth/resend-email");
      if (data.success) {
        setSuccess(true);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  if (!user?.isVerified) {
    return (
      <div className="flex justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-4">
          <h1 className="text-slate-700 font-semibold text-3xl">
            User not verified
          </h1>
          {success && <p className="text-xl text-red-500">Check your mail</p>}
          <div>
            {loading ? (
              <Spinner />
            ) : (
              <button
                onClick={resendMail}
                className="bg-[#00082c] text-white font-semibold p-3 rounded-md"
              >
                Resend Mail
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return <div>{children}</div>;
};

export default VerifiedRoute;
