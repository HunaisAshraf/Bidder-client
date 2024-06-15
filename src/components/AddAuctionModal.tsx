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
import Badge from "@mui/material/Badge";
import CloseIcon from "@mui/icons-material/Close";
import MailIcon from "@mui/icons-material/Mail";
import { axiosInstance } from "@/utils/constants";
import Image from "next/image";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type FormValues = {
  name: string;
  price: number;
  startDate: Date;
  endDate: Date;
  description: string;
  images: File[];
  // password: string;
  // confirmPassword: string;
};

export default function AddAuctionModal({
  setChange,
  change,
}: {
  setChange: React.Dispatch<React.SetStateAction<boolean>>;
  change: boolean;
}) {
  const [images, setImages] = useState<File[]>([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState,
    getValues,
    setError,
    clearErrors,
  } = useForm<FormValues>();
  const { errors } = formState;

  const addAuction = async (formValue: FormValues) => {
    try {
      setLoading(true);

      const { data } = await axios.post("/api/s3-upload", formValue, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        const auction = {
          itemName: formValue.name,
          basePrice: formValue.price,
          description: formValue.description,
          startDate: formValue.startDate,
          endDate: formValue.endDate,
          images: data.uploadedImage,
        };

        const response = await axiosInstance.post(
          "/api/auction/add-auction",
          auction
        );

        if (response?.data?.success) {
          setLoading(false);
          handleClose();
          setChange(!change);
          router.push("/profile/auctions");
        } else {
          setLoading(false);
          toast.error("failed to add auction");
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("failed to add auction");
    }
  };
  const handleDelete = async (image: any) => {
    const filteredImage = images.filter((img) => img !== image);
    setImages(filteredImage);

    const transferData = new DataTransfer();

    filteredImage.forEach((img) => transferData.items.add(img));
    (document.getElementById("image") as HTMLInputElement).files =
      transferData.files;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 3) {
      setError("images", {
        type: "max",
        message: "only three image should be uploaded",
      });
    } else if (files) {
      clearErrors("images");
      setImages(Array.from(files));
      console.log(images);
    }
  };

  return (
    <div>
      <div>
        <Toaster />
        <Button
          onClick={handleOpen}
          className="bg-[#231656] text-white py-2 px-4 rounded-md font-semibold hover:bg-[#201744]"
        >
          create auction
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
                  onSubmit={handleSubmit(addAuction)}
                  noValidate
                >
                  <h1 className="text-3xl font-semibold text-gray-500 my-10">
                    Create Auction
                  </h1>
                  <div className="flex gap-2">
                    <div>
                      <div className="my-3">
                        <label htmlFor="itemname" className="text-gray-500">
                          Item Name
                        </label>
                        <input
                          type="text"
                          id="itemname"
                          className="outline-none border px-3 py-2 mt-2 rounded-md w-full"
                          placeholder="name"
                          {...register("name", {
                            required: "Please enter name",
                            pattern: {
                              value: /^[A-Za-z]+$/i,
                              message:
                                "Please valid characters only. [Alphabets A to Z, a to z ]",
                            },
                          })}
                        />
                        <span className="text-red-600">
                          {errors.name?.message}
                        </span>
                      </div>
                      <div className="my-3">
                        <label htmlFor="price" className="text-gray-500">
                          Base Price
                        </label>
                        <input
                          type="number"
                          id="price"
                          className="outline-none border px-3 py-2 mt-2 rounded-md w-full"
                          placeholder="price"
                          {...register("price", {
                            required: "enter the price",
                            min: { value: 30, message: "Minimum price is 30" },
                          })}
                        />
                        <span className="text-red-600">
                          {errors.price?.message}
                        </span>
                      </div>
                      <div className="my-3">
                        <label htmlFor="description" className="text-gray-500">
                          Description
                        </label>
                        <input
                          type="text"
                          id="description"
                          className="outline-none border px-3 py-2 mt-2 rounded-md w-full"
                          placeholder="description"
                          {...register("description", {
                            required: "enter the description",
                          })}
                        />
                        <span className="text-red-600">
                          {errors.description?.message}
                        </span>
                      </div>
                      <div className="my-3">
                        <label htmlFor="startDate" className="text-gray-500">
                          Start Date
                        </label>
                        <input
                          type="date"
                          id="startDate"
                          className="outline-none border px-3 py-2 mt-2 rounded-md w-full"
                          placeholder="startDate"
                          {...register("startDate", {
                            required: "enter the startDate",
                            validate: (value) => {
                              const today = new Date();
                              if (today && new Date(value) < today) {
                                return "End date must be after current date";
                              }
                              return true;
                            },
                          })}
                        />
                        <span className="text-red-600">
                          {errors.startDate?.message}
                        </span>
                      </div>
                      <div className="my-3">
                        <label htmlFor="endDate" className="text-gray-500">
                          End Date
                        </label>
                        <input
                          type="date"
                          id="endDate"
                          className="outline-none border px-3 py-2 mt-2 rounded-md w-full"
                          placeholder="endDate"
                          {...register("endDate", {
                            required: "enter the endDate",
                            validate: (value) => {
                              const startDate = getValues("startDate");
                              if (
                                startDate &&
                                new Date(value) <= new Date(startDate)
                              ) {
                                return "End date must be after start date";
                              }
                              return true;
                            },
                          })}
                        />
                        <span className="text-red-600">
                          {errors.endDate?.message}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="my-3">
                        <label htmlFor="image" className="text-gray-500">
                          End Date
                        </label>
                        <input
                          type="file"
                          id="image"
                          className="outline-none border px-3 py-2 mt-2 rounded-md w-full"
                          placeholder="image"
                          accept="image/*"
                          multiple
                          {...register("images", {
                            required: "Please upload three images",
                            validate: {
                              exactlyThreeFiles: (files) =>
                                files.length === 3 ||
                                "You must upload exactly three images",
                            },
                          })}
                          onChange={handleChange}
                        />
                        <span className="text-red-600">
                          {errors.images?.message}
                        </span>
                      </div>
                      <div className=" p-6 flex flex-wrap gap-5 shadow-md">
                        {images.map((image, i) => (
                          <Badge
                            key={i}
                            badgeContent={<CloseIcon />}
                            color="error"
                          >
                            <Image onClick={() => handleDelete(image)}
                            width={180}
                            height={128}
                              className="h-32 w-44 my-3 shadow-lg "
                              src={URL.createObjectURL(image)}
                              alt={image.name}
                            />
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  {loading ? (
                    <Spinner />
                  ) : (
                    <button className="bg-[#002A2C] w-full text-white font-semibold p-3 rounded-md">
                      SignUp
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
