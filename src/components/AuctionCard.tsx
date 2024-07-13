"use client";

import { useAppSelector } from "@/lib/store/hooks";
import moment from "moment";
import Image from "next/image";
import React from "react";

import { axiosInstance } from "@/utils/constants";
import toast, { Toaster } from "react-hot-toast";

type Auction = {
  id: string;
  itemName: string;
  basePrice: number;
  description: string;
  startDate: Date;
  endDate: Date;
  image: string;
  completed: boolean;
  auctioner: string;
};

export default function AuctionCard({
  id,
  itemName,
  basePrice,
  description,
  startDate,
  endDate,
  image,
  completed,
  auctioner,
}: Auction) {
  const user = useAppSelector((state) => state.users.user);

  return (
    <div className=" flex flex-col md:flex-row shadow-lg p-4 my-5 items-center">
      <Toaster />
      <Image height={180} width={260} className="rounded" src={image} alt="" />
      <div className="p-2 w-full md:ml-4">
        {new Date(startDate) < new Date() && new Date(endDate) > new Date() && (
          <div className="mb-2 flex justify-center">
            <span className="text-center shadow-lg text-green-500 px-4 py-2 rounded-lg">
              Live
            </span>
          </div>
        )}
        <h1 className="text-2xl font-semibold">{itemName}</h1>
        <p className="text-gray-500">{description}</p>
        <div className="flex flex-col md:flex-row gap-6 mt-4">
          <div>
            {new Date(startDate) > new Date() ? (
              <>
                <h1 className="text-xl font-semibold">Auction Start Date</h1>
                <p className="text-gray-500">
                  {moment(startDate).format("lll")}
                </p>
              </>
            ) : (
              <>
                <h1 className="text-xl font-semibold">Auction Ending</h1>
                <p className="text-gray-500">{moment(endDate).format("lll")}</p>
              </>
            )}
          </div>
          <div>
            <p className="font-bold">$ Current Bid</p>
            <p className="text-gray-500">${basePrice}</p>
            {user?._id !== auctioner && (
              <div className="mt-3">
                {completed ? (
                  <button className="p-2 shadow bg-yellow-500 text-white font-semibold rounded-lg">
                    Completed
                  </button>
                ) : (
                  <button className="p-2 shadow bg-[#200f66] text-white font-semibold rounded-lg">
                    Place Bid
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
