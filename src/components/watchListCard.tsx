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
        `/api/v1/watchlist/delete-watchlist/${id}`
      );

      if (data.success) {
        setChange((prev) => (prev = !prev));
        toast.success("removed from watchlist");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
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
