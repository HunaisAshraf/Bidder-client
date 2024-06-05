"use client";

import AuctionCard from "@/components/AuctionCard";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

type Auction = {
  _id: string;
  itemName: string;
  basePrice: number;
  description: string;
  startDate: Date;
  endDate: Date;
  images: string;
};

export default function Auction() {
  const [auctions, setAuctions] = useState<Auction[]>([]);

  const getData = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/auction/get-all-auctions`
      );
      if (data.success) {
        setAuctions(data.auctions);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="mx-6 md:mx-16 lg:mx-32 min-h-[91vh] mt-2 md:mt-5">
      <div className="flex items-center justify-between">
        <h1 className="text-gray-500 text-xl md:text-3xl font-bold">
          Live <span className="text-[#231656]">Auction</span>
        </h1>
        <div className="flex">
          <input
            className="outline-none shadow-md px-4 py-2 rounded-l-full w-[200px] md:w-[400px]"
            placeholder="Search..."
            type="text"
          />
          <button className="bg-[#231656] text-white py-2 px-4 rounded-r-full font-semibold">
            search
          </button>
        </div>
      </div>
      <div className="my-4 flex flex-wrap">
        {auctions?.map((auction) => (
          <Link href={`/auctions/${auction._id}`}>
            <AuctionCard
              basePrice={auction.basePrice}
              description={auction.description}
              endDate={auction.endDate}
              itemName={auction.itemName}
              startDate={auction.endDate}
              image={auction.images[0]}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
