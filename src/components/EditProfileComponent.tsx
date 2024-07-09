"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useForm } from "react-hook-form";
import Input from "./Input";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import AlternateEmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import Spinner from "./Spinner";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { setUser } from "@/lib/store/features/userSlice";
import { axiosInstance } from "@/utils/constants";
import Image from "next/image";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type FormValues = {
  name: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  images: File[] | undefined;
  // password: string;
  // confirmPassword: string;
};

export default function EditProfileComponent() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [img, setImg] = useState<File>();

  const [loading, setLoading] = React.useState(false);

  const user = useAppSelector((state) => state.users.user);
  const dispatch = useAppDispatch();

  const router = useRouter();

  const { register, handleSubmit, formState, setValue } = useForm<FormValues>();
  const { errors } = formState;

  const handleUpdate = async (formValue: FormValues) => {
    try {
      setLoading(true);

      let image;
      console.log("kjsdanfkjsdf", formValue);

      if (formValue.images && formValue.images.length > 0) {
        const { data } = await axios.post("/api/s3-upload", formValue, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(data);

        if (data.success) {
          image = data.uploadedImage[0];
        }
      }

      const updateuser = {
        name: formValue.name,
        email: formValue.email,
        phone: formValue.phone,
        profilePicture: image,
      };

      console.log(updateuser);

      const { data } = await axiosInstance.put(
        `/api/auth/update-user`,
        updateuser
      );

      if (data?.success) {
        localStorage.setItem("auth", JSON.stringify(data.user));
        dispatch(setUser(user));
        setLoading(false);
        handleClose();
        window.location.reload();
      }
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const file = files[0];

      setImg(file);
    }
  };

  useEffect(() => {
    setValue("name", user?.name);
    setValue("phone", user?.phone);
    setValue("email", user?.email);
  }, [user, setValue]);

  return (
    <div>
      <div>
        <Toaster />
        <Button onClick={handleOpen}>
          <AddAPhotoIcon />
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box id="modal-modal-description" sx={{ mt: 2 }}>
              <div>
                <form
                  className=""
                  onSubmit={handleSubmit(handleUpdate)}
                  noValidate
                >
                  <h1 className="text-3xl font-semibold text-gray-500 my-10">
                    Edit User
                  </h1>

                  <div>
                    {img && (
                      <Image
                        width={300}
                        height={300}
                        src={URL.createObjectURL(img)}
                        alt=""
                      />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      {...register("images")}
                      onChange={handleChange}
                    />
                  </div>

                  <Input
                    type="text"
                    placeholder="Name"
                    icon={<DriveFileRenameOutlineRoundedIcon />}
                    {...register("name", {
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
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                        message: "Please enter valid email",
                      },
                    })}
                    errors={errors.email?.message}
                  />
                  <Input
                    type="number"
                    placeholder="Phone"
                    icon={<LocalPhoneRoundedIcon />}
                    {...register("phone", {})}
                    errors={errors.phone?.message}
                  />
                  {/* <Input
                  type="password"
                  placeholder="Password"
                  icon={<PasswordRoundedIcon />}
                  {...register("password", {
                    required: "Please enter password",
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
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
                /> */}
                  {loading ? (
                    <Spinner />
                  ) : (
                    <button className="bg-[#002A2C] w-full text-white font-semibold p-3 rounded-md">
                      Submit
                    </button>
                  )}
                </form>
              </div>
            </Box>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
