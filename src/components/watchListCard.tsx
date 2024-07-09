"use client";

import { useAppSelector } from "@/lib/store/hooks";
import { axiosInstance } from "@/utils/constants";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import moment from "moment";
import Link from "next/link";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

interface AuctionProps {
  id: string;
  auction: {
    _id: string;
    itemName: string;
    basePrice: number;
    currentBid: number;
    description: string;
    auctioner: string;
    startDate: string;
    endDate: string;
    isListed: boolean;
    isVerified: boolean;
    isBlocked: boolean;
    images: string[];
    completed: boolean;
    started: boolean;
  };
  setChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const WatchListCard = ({ auction, id, setChange }: AuctionProps) => {
  const user = useAppSelector((state) => state.users.user);
  const isLive =
    new Date(auction.startDate) < new Date() &&
    new Date(auction.endDate) > new Date();

  const handleButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    removeFromWatchList(id);
  };

  const removeFromWatchList = async (id: string) => {
    try {
      const { data } = await axiosInstance.delete(
        `/api/watchlist/delete-watchlist/${id}`
      );

      if (data.success) {
        console.log("deleteing");

        setChange((prev) => (prev = !prev));
        toast.success("removed from watchlist");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    // <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-5">
    //   <div className="flex items-center p-4">
    //     <Image
    //       height={180}
    //       width={260}
    //       className="rounded"
    //       src={auction?.images[0]}
    //       alt={auction?.itemName}
    //     />
    //     <div className="p-2 w-full">
    //       {isLive && (
    //         <div className="mb-2 flex justify-center">
    //           <span className="text-center shadow-lg text-green-500 px-4 py-2 rounded-lg">
    //             Live
    //           </span>
    //         </div>
    //       )}
    //       <h1 className="text-2xl font-semibold">{auction?.itemName}</h1>
    //       <p className="text-gray-500">{auction?.description}</p>
    //       <div className="flex gap-6 mt-4">
    //         <div>
    //           {new Date(auction?.startDate) > new Date() ? (
    //             <>
    //               <h1 className="text-xl font-semibold">Auction Start Date</h1>
    //               <p className="text-gray-500">
    //                 {moment(auction?.startDate).format("lll")}
    //               </p>
    //             </>
    //           ) : (
    //             <>
    //               <h1 className="text-xl font-semibold">Auction Ending</h1>
    //               <p className="text-gray-500">
    //                 {moment(auction?.endDate).format("lll")}
    //               </p>
    //             </>
    //           )}
    //         </div>
    //         <div>
    //           <p className="font-bold">$ Current Bid</p>
    //           <p className="text-gray-500">${auction?.currentBid}</p>
    //           {user?._id !== auction?.auctioner && (
    //             <div className="mt-3">
    //               {auction?.completed ? (
    //                 <button className="p-2 shadow bg-yellow-500 text-white font-semibold rounded-lg">
    //                   Completed
    //                 </button>
    //               ) : (
    //                 <button className="p-2 shadow bg-[#200f66] text-white font-semibold rounded-lg">
    //                   Place Bid
    //                 </button>
    //               )}
    //             </div>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <Link href={`/auctions/${auction._id}`}>
      <Card sx={{ maxWidth: 345 }}>
        <Toaster />
        <CardMedia
          sx={{ height: 140 }}
          image={auction.images[0]}
          title={auction.itemName}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {auction.itemName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Start Date : {moment(auction.startDate).format("lll")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            End Date : {moment(auction.endDate).format("lll")}
          </Typography>
        </CardContent>
        <CardActions>
          <button
            className="p-2 shadow bg-[#200f66] text-white font-semibold rounded-lg"
            onClick={handleButtonClick}
          >
            Remove
          </button>
        </CardActions>
      </Card>
    </Link>
  );
};

export default WatchListCard;
