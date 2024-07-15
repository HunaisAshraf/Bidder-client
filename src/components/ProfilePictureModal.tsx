"use client";

import React, { useEffect } from "react";
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
  image: File[] | undefined;
};

export default function ProfilePictureModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [loading, setLoading] = React.useState(false);

  const user = useAppSelector((state) => state.users.user);
  const dispatch = useAppDispatch();

  const router = useRouter();

  const { register, handleSubmit, formState, setValue } = useForm<FormValues>();
  const { errors } = formState;

  const handleUpdate = async (formValue: FormValues) => {
    try {
      setLoading(true);

      const { data } = await axios.post("/api/s3-upload", formValue, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        const user = {
          id: data?.user?._id,
          name: data?.user?.name,
          email: data?.user?.email,
          phone: data?.user?.phone,
          profilePicture: data?.user?.profilePicture,
        };
        localStorage.setItem("auth", JSON.stringify(user));
        dispatch(setUser(user));
        setLoading(false);
        router.push("/profile/details");
      } else {
        toast.error("failed to update profile picture");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    setValue("name", user?.name);
    setValue("phone", user?.phone);
    setValue("email", user?.email);
  }, [user]);

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
                    <input
                      type="file"
                      accept="image/*"
                      {...register("image", {
                        required: "Please enter name",
                      })}
                      multiple
                    />
                  </div>

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
