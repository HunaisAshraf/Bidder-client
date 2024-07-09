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
          `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/auction/get-all-auctions`
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
  console.log("live", live);
  console.log("upcoming", upcoming);

  return (
    <div className="mx-8 md:mx-16 lg:mx-32 min-h-[91vh] mt-2">
      {live && live.length > 0 && (
        <div className=" md:mt-5">
          <h1 className="text-gray-500 text-xl md:text-3xl font-bold">
            Live <span className="text-[#231656]">Auction</span>
          </h1>
          {/* <div className="flex items-center justify-between">
            <div className="flex">
              <input
                className="outline-none shadow-md px-4 py-2 rounded-l-full w-[120px] md:w-[400px]"
                placeholder="Search..."
                type="text"
              />
              <button className="bg-[#231656] text-white py-2 px-4 rounded-r-full font-semibold">
                search
              </button>
            </div>
          </div> */}
          <div className="my-4 mx-12 md:mx-0 flex flex-wrap">
            {live?.map((auction) => (
              <Link href={`/auctions/${auction._id}`} key={auction._id}>
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
          <div className="my-4 flex flex-wrap">
            {upcoming?.map((auction) => (
              <Link href={`/auctions/${auction._id}`} key={auction._id}>
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
