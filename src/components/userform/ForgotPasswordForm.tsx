"use client";

import toast, { Toaster } from "react-hot-toast";
import Spinner from "../Spinner";
import Input from "../Input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/utils/constants";
import AlternateEmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";

export default function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const router = useRouter();

  const handleForgotPassword = async (formData: any) => {
    try {
      setLoading(true);

      const { data } = await axiosInstance.post(
        "/api/v1/auth/forgotpassword",
        formData
      );

      if (data?.success) {
        router.replace("/forgot-password/confirm-mail");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      className="w-100"
      onSubmit={handleSubmit(handleForgotPassword)}
      noValidate
    >
      <Toaster />
      <h1 className="text-3xl font-semibold text-gray-500 mt-10 mb-5">
        Forgot Password
      </h1>
      <p className="text-gray-500">Please Enter Your Email Id</p>
      <Input
        type="email"
        placeholder="Email"
        icon={<AlternateEmailRoundedIcon />}
        {...register("email", {
          required: "Please enter email",
          pattern: {
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
            message: "Please enter valid email",
          },
        })}
      />

      {loading ? (
        <Spinner />
      ) : (
        <button className="bg-[#002A2C] w-full text-white font-semibold p-3 rounded-md">
          Loing
        </button>
      )}
    </form>
  );
}
