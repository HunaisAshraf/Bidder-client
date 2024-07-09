"use client";
import { useAppDispatch } from "@/lib/store/hooks";
import { axiosInstance } from "@/utils/constants";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Input from "../Input";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import AlternateEmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";
import PasswordRoundedIcon from "@mui/icons-material/PasswordRounded";
import Spinner from "../Spinner";
import { setAdmin } from "@/lib/store/features/adminSlice";

type FormValue = {
  email: string;
  password: string;
};

export default function AdminLoginForm() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState } = useForm<FormValue>();
  const { errors } = formState;
  const router = useRouter();

  const dispatch = useAppDispatch();

  const handleLogin = async (formData: FormValue) => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.post(
        "/api/auth/admin-login",
        formData
      );

      if (data?.success) {
        localStorage.setItem("admin-auth", JSON.stringify(data.admin));
        localStorage.setItem("admin-token", JSON.stringify(data?.token));

        dispatch(setAdmin(data.admin));

        router.replace("/admin/dashboard");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        className="w-100 shadow-2xl p-16 rounded-sm"
        onSubmit={handleSubmit(handleLogin)}
        noValidate
      >
        <Toaster />
        <h1 className="text-3xl font-semibold text-gray-500 my-10">
          Admin Login
        </h1>
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
          errors={errors.email?.message}
        />
        <Input
          type="password"
          placeholder="Password"
          icon={<PasswordRoundedIcon />}
          {...register("password", {
            required: "Please enter password",
          })}
          errors={errors.password?.message}
        />
        {loading ? (
          <Spinner />
        ) : (
          <button className="bg-[#002A2C] w-full text-white font-semibold p-3 rounded-md">
            Login
          </button>
        )}
      </form>
    </>
  );
}
