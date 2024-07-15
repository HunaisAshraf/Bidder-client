"use client";

import React, { useEffect, useState } from "react";
import { useSocket } from "@/utils/hooks/useSocket";
import moment from "moment";
import { axiosInstance } from "@/utils/constants";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

type BidType = {
  _id: string;
  bidAmount: number;
  bidTime: Date;
  userId: any;
};

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 300 },
  { field: "userId", headerName: "User", width: 200 },
  { field: "bidAmount", headerName: "Bid Amount", width: 200 },
  { field: "bidTime", headerName: "Bid Time", width: 200 },
];

let rows: BidType[] = [];

export default function BidderListComponent({
  auctionId,
}: {
  auctionId: string;
}) {
  const [bids, setBids] = useState<BidType[]>([]);

  const { socket } = useSocket();

  const arr = [];

  for (let i = 0; i < bids.length; i++) {
    arr.push({
      id: i + 1,
      ...bids[i],
      userId: bids[i].userId.name,
      date: moment(bids[i].bidTime).format("lll"),
    });
  }

  rows = arr;

  useEffect(() => {
    const getBids = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/api/v1/auction/get-bids/${auctionId}`
        );

        if (data.success) {
          setBids((prev) => [...data?.bids]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getBids();
  }, [auctionId]);

  useEffect(() => {
    socket?.on("newBid", (bid) => {
      setBids((prev) => [bid, ...prev]);
    });
  }, [socket]);

  return (
    <div className="p-3">
      <h1 className="text-3xl my-4 font-semibold text-gray-500">Bidder List</h1>
      <div style={{ height: 350, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </div>
    </div>
  );
}
