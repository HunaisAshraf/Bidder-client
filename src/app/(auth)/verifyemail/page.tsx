"use client";

import { axiosInstance } from "@/utils/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmail() {
  const [verifying, setVerifying] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();

  const type = searchParams.get("type");
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  async function verify() {
    try {
      setVerifying(true);
      const { data } = await axiosInstance.post("/api/auth/verify-email", {
        type,
        token,
        email,
      });

      console.log(data);

      if (data.success) {
        setVerifying(false);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    verify();
  }, []);

  return (
    <div className="min-h-[100vh] flex justify-center items-center">
      {verifying ? <h1> Loading.....</h1> : <h1> Redirecting...</h1>}
    </div>
  );
}
