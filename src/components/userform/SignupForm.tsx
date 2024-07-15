"use client";

import React, { useState } from "react";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import AlternateEmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import PasswordRoundedIcon from "@mui/icons-material/PasswordRounded";
import { axiosInstance } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Input from "../Input";
import Spinner from "../Spinner";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "@/lib/store/features/userSlice";

type FormValues = {
  name: string;
  email: string;
  phone: number;
  password: string;
  confirmPassword: string;
};

export default function SignupForm() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState, getValues } =
    useForm<FormValues>();
  const { errors } = formState;

  const dispatch = useDispatch();

  const router = useRouter();

  const handleSignup = async (formData: FormValues) => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.post(
        "/api/v1/auth/signup",
        formData
      );

      if (data?.success) {
        const user = {
          _id: data?.user?._id,
          name: data?.user?.name,
          email: data?.user?.email,
          phone: data?.user?.phone,
          profilePicture: data?.user?.profilePicture,
        };
        localStorage.setItem("auth", JSON.stringify(user));
        localStorage.setItem("token", JSON.stringify(data?.token));
        dispatch(setUser(user));

        setLoading(false);

        router.replace("/role");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("failed to signup");
    }
  };
  return (
    <div>
      <Toaster />
      <form
        className="w-[400px]"
        onSubmit={handleSubmit(handleSignup)}
        noValidate
      >
        <h1 className="text-3xl font-semibold text-gray-500 my-10">SignUp</h1>
        <Input
          type="text"
          placeholder="Name"
          icon={<DriveFileRenameOutlineRoundedIcon />}
          {...register("name", {
            required: "Please enter name",
            pattern: {
              value: /^[A-Za-z]+$/i,
              message:
                "Please valid characters only. [Alphabets A to Z, a to z ]",
            },
          })}
          errors={errors.name?.message}
        />
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
          type="number"
          placeholder="Phone"
          icon={<LocalPhoneRoundedIcon />}
          {...register("phone", {
            required: "Please enter phone number",
            minLength: {
              value: 10,
              message: "Please enter valid phone number",
            },
            maxLength: {
              value: 10,
              message: "Please enter valid phone number",
            },
          })}
          errors={errors.phone?.message}
        />
        <Input
          type="password"
          placeholder="Password"
          icon={<PasswordRoundedIcon />}
          {...register("password", {
            required: "Please enter password",
            pattern: {
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
              message:
                "Password must contain at least 8 characters, 1 upper & lowercase letter, 1 number, on 1 special character",
            },
          })}
          errors={errors.password?.message}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          icon={<PasswordRoundedIcon />}
          {...register("confirmPassword", {
            validate: (value) => {
              const password = getValues("password");
              return password === value || "Password dosen't match";
            },
          })}
          errors={errors.confirmPassword?.message}
        />
        {loading ? (
          <Spinner />
        ) : (
          <button className="bg-[#002A2C] w-full text-white font-semibold p-3 rounded-md">
            SignUp
          </button>
        )}
      </form>
    </div>
  );
}
