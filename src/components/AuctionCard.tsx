import moment from "moment";
import Image from "next/image";
import React from "react";

type Auction = {
  itemName: string;
  basePrice: number;
  description: string;
  startDate: Date;
  endDate: Date;
  image: string;
  completed: boolean;
};

export default function AuctionCard({
  itemName,
  basePrice,
  description,
  startDate,
  endDate,
  image,
  completed,
}: Auction) {
  return (
    <div className="flex  shadow-lg p-4  my-5 items-center">
      <Image height={180} width={260} className="rounded" src={image} alt="" />
      <div className="p-2 w-full">
        {new Date(startDate) < new Date() && new Date(endDate) > new Date() && (
          <div className="mb-2 flex justify-center">
            <span className="text-center shadow-lg text-green-500 px-4 py-2 rounded-lg">
              Live
            </span>
          </div>
        )}
        <h1 className="text-2xl font-semibold ">{itemName}</h1>
        <p className="text-gray-500">{description}</p>
        <div className="flex gap-6 mt-4">
          <div className="">
            {new Date(startDate) > new Date() ? (
              <>
                <h1 className="text-xl font-semibold">Auction StartDate</h1>
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
          <div className="">
            <p className="font-bold">$ Current Bid</p>
            <p className="text-gray-500">${basePrice}</p>
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
        </div>
      </div>
    </div>
  );
}
