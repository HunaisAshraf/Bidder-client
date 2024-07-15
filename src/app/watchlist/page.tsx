"use client";

import WatchListCard from "@/components/watchListCard";
import { axiosInstance } from "@/utils/constants";
import React, { useEffect, useState } from "react";

export default function WatchList() {
  const [auctions, setAuctions] = useState([]);
  const [change, setChange] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axiosInstance.get(
        "/api/v1/watchlist/get-watchlist"
      );
      if (data.success) {
        setAuctions(data.watchLists);
      }
    };
    getData();
  }, [change]);

  if (auctions.length === 0) {
    return (
      <div className="mx-6 md:mx-16 lg:mx-32 min-h-[90vh] mt-2 flex justify-center items-center">
        <h1 className="text-slate-600 font-semibold text-2xl">
          No auction subscribed
        </h1>
      </div>
    );
  }

  return (
    <div className="mx-16 md:mx-16 lg:mx-32 min-h-[90vh] mt-2">
      <h1 className="font-semibold text-xl sm:text-2xl text-slate-600">
        Watch Lists
      </h1>
      <div className="my-8 flex gap-3 flex-wrap">
        {auctions.map((auction: any) => (
          <WatchListCard
            key={auction._id}
            id={auction._id}
            setChange={setChange}
            auction={auction.auction}
          />
        ))}
      </div>
    </div>
  );
}
