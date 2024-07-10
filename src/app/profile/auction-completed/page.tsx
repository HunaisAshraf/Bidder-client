import AuctionCompletedTable from "@/components/AuctionCompletedTeble";
import axios from "axios";
import { cookies } from "next/headers";
import React from "react";

async function getData() {
  const token = cookies().get("token");
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/auction/completed-auction`,
    {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    }
  );

  return data;
}

export default async function AuctionCompleted() {
  const data = await getData();

  return (
    <div>
      <AuctionCompletedTable auctions={data.auctions} />
    </div>
  );
}
