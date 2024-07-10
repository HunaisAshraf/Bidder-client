import AuctionWonTable from "@/components/user/AuctionWonTable";
import axios from "axios";

import { cookies, headers } from "next/headers";

import React from "react";

type Auctions = {
  _id: string;
  auctionItem: {
    itemName: string;
    basePrice: string;
    description: string;
    images: string[];
    endDate: Date;
  };
  bidAmount: number;
};

async function getData() {
  try {
    const token = cookies().get("token");

    let auctions;

    let { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/auction/auction-won`,
      {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      }
    );

    if (data?.success) {
      auctions = data.auctionsWon;
    }

    return auctions;
  } catch (error: any) {
    console.log(error);
  }
}

export default async function AuctionWon() {
  const auctions: Auctions[] = await getData();

  return (
    <div>
      <AuctionWonTable auctions={auctions} />
    </div>
  );
}
