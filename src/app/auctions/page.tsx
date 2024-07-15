"use client";

import AuctionCard from "@/components/AuctionCard";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "./loading";

type Auction = {
  _id: string;
  itemName: string;
  basePrice: number;
  description: string;
  startDate: Date;
  endDate: Date;
  images: string;
  completed: boolean;
  auctioner: string;
};

export default function Auction() {
  const [auctions, setAuctions] = useState<Auction[] | null>();
  const [live, setLive] = useState<Auction[] | null>();
  const [upcoming, setUpcoming] = useState<Auction[] | null>();

  const categorizeAuctions = (data: Auction[]) => {
    const currentDate = new Date();
    const liveAuctions = data.filter(
      (auction) =>
        new Date(auction.startDate) < currentDate &&
        new Date(auction.endDate) > currentDate
    );
    const upcomingAuctions = data.filter(
      (auction) => new Date(auction.startDate) > currentDate
    );
    setLive(liveAuctions);
    setUpcoming(upcomingAuctions);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/auction/get-all-auctions`
        );
        if (data.success) {
          setAuctions(data.auctions);
          categorizeAuctions(data.auctions);
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    getData();
  }, []);

  if (!auctions) {
    return <Loading />;
  }

  if (auctions.length === 0) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h1 className="text-gray-500 text-xl md:text-3xl font-bold">
          No Available <span className="text-[#231656]">Auction</span>
        </h1>
      </div>
    );
  }

  return (
    <div className="mx-4 md:mx-16 lg:mx-32 min-h-[91vh] mt-2">
      {live && live.length > 0 && (
        <div className="md:mt-5">
          <h1 className="text-gray-500 text-xl md:text-3xl font-bold">
            Live <span className="text-[#231656]">Auction</span>
          </h1>
          <div className="my-4 flex flex-wrap gap-4 justify-center">
            {live?.map((auction) => (
              <Link
                href={`/auctions/${auction._id}`}
                key={auction._id}
                className="flex-grow md:flex-grow-0"
              >
                <AuctionCard
                  id={auction._id}
                  basePrice={auction.basePrice}
                  description={auction.description}
                  endDate={auction.endDate}
                  itemName={auction.itemName}
                  startDate={auction.startDate}
                  image={auction.images[0]}
                  completed={auction.completed}
                  auctioner={auction.auctioner}
                />
              </Link>
            ))}
          </div>
        </div>
      )}
      {upcoming && upcoming.length > 0 && (
        <div className="md:mt-5">
          <div>
            <h1 className="text-gray-500 text-xl md:text-3xl font-bold">
              Upcoming <span className="text-[#231656]">Auction</span>
            </h1>
          </div>
          <div className="my-4 flex flex-wrap gap-4 justify-center">
            {upcoming?.map((auction) => (
              <Link
                href={`/auctions/${auction._id}`}
                key={auction._id}
                className="flex-grow md:flex-grow-0"
              >
                <AuctionCard
                  id={auction._id}
                  basePrice={auction.basePrice}
                  description={auction.description}
                  endDate={auction.endDate}
                  itemName={auction.itemName}
                  startDate={auction.startDate}
                  image={auction.images[0]}
                  completed={auction.completed}
                  auctioner={auction.auctioner}
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
