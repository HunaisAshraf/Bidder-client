"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import Spinner from "./Spinner";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Badge from "@mui/material/Badge";
import CloseIcon from "@mui/icons-material/Close";
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
  _id: string;
  itemName: string;
  basePrice: number;
  startDate: string;
  endDate: string;
  description: string;
  images: string[];
};

export default function EditAuctionModal({
  id,
  change,
  setChange,
}: {
  id: string;
  change: boolean;
  setChange: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [images, setImages] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [auction, setAuction] = useState<FormValues>();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState,
    getValues,
    setValue,
    setError,
    clearErrors,
  } = useForm<FormValues>();
  const { errors } = formState;

  const editAuction = async (formValue: FormValues) => {
    try {
      setLoading(true);

      const editedAuction = {
        itemName: formValue.itemName,
        basePrice: formValue.basePrice,
        description: formValue.description,
        startDate: formValue.startDate,
        endDate: formValue.endDate,
        images,
      };

      const response = await axiosInstance.put(
        `/api/v1/auction/edit-auction/${auction?._id}`,
        editedAuction
      );

      if (response?.data?.success) {
        setLoading(false);
        toast.success("auction edited successfully");
        setChange(!change);
        handleClose();
      } else {
        setLoading(false);
        toast.error("failed to add auction");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("failed to edit auction");
    }
  };

  const handleChange = async (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    try {
      const formValue = new FormData();

      const files = e.target.files;
      if (files) {
        Array.from(files).forEach((file) => {
          formValue.append("images[]", file);
        });
      }

      const { data } = await axios.post("/api/s3-upload", formValue, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        if (auction?.images) {
          const img = [...auction?.images];
          img[index] = data.uploadedImage[0];

          setImages(img);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getAuction = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/api/v1/auction/get-single-auction/${id}`
        );

        if (data?.success) {
          setAuction(data.auction);
          setImages(data?.auction?.images);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getAuction();
  }, [id]);

  useEffect(() => {
    if (auction) {
      setValue("itemName", auction?.itemName);
      setValue("basePrice", auction?.basePrice);
      setValue("description", auction?.description);
      setValue("startDate", auction.startDate.split("T")[0]);
      setValue("endDate", auction.endDate.split("T")[0]);
    }
  }, [auction, setValue]);

  return (
    <div>
      <div>
        <Button
          onClick={handleOpen}
          className="bg-[#231656] text-white py-2 px-4 rounded-md font-semibold hover:bg-[#201744]"
        >
          Edit
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
                  onSubmit={handleSubmit(editAuction)}
                  noValidate
                >
                  <h1 className="text-3xl font-semibold text-gray-500 my-10">
                    Edit Auction
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
                          {...register("itemName", {
                            required: "Please enter name",
                            pattern: {
                              value: /^[A-Za-z]+$/i,
                              message:
                                "Please valid characters only. [Alphabets A to Z, a to z ]",
                            },
                          })}
                        />
                        <span className="text-red-600">
                          {errors.itemName?.message}
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
                          {...register("basePrice", {
                            required: "enter the price",
                            min: { value: 30, message: "Minimum price is 30" },
                          })}
                        />
                        <span className="text-red-600">
                          {errors.basePrice?.message}
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
                              today.setHours(today.getHours() - 24);
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
                      <div className=" px-6 shadow-md">
                        {images.map((auct, i) => (
                          <div key={i}>
                            <Image
                              height={150}
                              width={200}
                              src={auct}
                              alt={auct}
                              id={`image${i}`}
                            />
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleChange(e, i)}
                            />
                          </div>
                        ))}
                      </div>
                      <div className="my-3 "></div>
                    </div>
                  </div>
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
