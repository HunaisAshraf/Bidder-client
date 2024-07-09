"use client";

import WatchListCard from "@/components/watchListCard";
import { axiosInstance } from "@/utils/constants";
import axios from "axios";
import { cookies } from "next/headers";
import React, { useEffect, useState } from "react";

// async function getData() {
//   try {
//     const token = cookies().get("token");

//     const { data } = await axios.get(
//       `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/watchlist/get-watchlist`,
//       {
//         headers: {
//           Authorization: `Bearer ${token?.value}`,
//         },
//       }
//     );
//     return data.watchLists;
//   } catch (error) {
//     console.log(error);
//   }
// }

export default function WatchList() {
  // const data = await getData();
  // console.log(data); // const data = await getData();
  // console.log(data);
  const [auctions, setAuctions] = useState([]);
  const [change, setChange] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axiosInstance.get("/api/watchlist/get-watchlist");
      if (data.success) {
        console.log(data);

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
    <div className="mx-6 md:mx-16 lg:mx-32 min-h-[90vh] mt-2">
      <h1 className="font-semibold text-2xl text-slate-600">Watch Lists</h1>
      <div className="my-8">
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
