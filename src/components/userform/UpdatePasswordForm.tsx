"use client";

import toast, { Toaster } from "react-hot-toast";
import Input from "../Input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/utils/constants";
import PasswordRoundedIcon from "@mui/icons-material/PasswordRounded";
import Spinner from "../Spinner";
import { useSearchParams } from "next/navigation";

type FormValues = {
  password: string;
  confirmPassword: string;
};

export default function UpdatePasswordForm() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState, getValues } =
    useForm<FormValues>();
  const { errors } = formState;

  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  const handleUpdatePassword = async (formData: FormValues) => {
    try {
      setLoading(true);

      console.log(formData);

      const { data } = await axiosInstance.put("/api/auth/update-password", {
        password: formData.password,
        email,
      });

      console.log(data);

      if (data?.success) {
        setLoading(false);
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("failed to update password");
    }
  };
  return (
    <form
      className="w-[400px]"
      onSubmit={handleSubmit(handleUpdatePassword)}
      noValidate
    >
      <Toaster />
      <h1 className="text-3xl font-semibold text-gray-500 mt-10 mb-5">
        Reset Password
      </h1>
      <p className="text-gray-500 my-3">Enter new password</p>

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
          submit
        </button>
      )}
    </form>
  );
}
