import axios from "axios";
import React from "react";
import { cookies } from "next/headers";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Image from "next/image";
import moment from "moment";

type Bid = {
  _id: string;
  auctionId: {
    _id: string;
    itemName: string;
    basePrice: number;
    images: string[];
  };
  bidAmount: number;
  bidTime: Date;
};

export default async function BiddingHistory() {
  const token = cookies().get("token");

  let bids: Bid[] | null = null;

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/auction/bidding-history`,
    {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    }
  );

  if (data?.success) {
    bids = data.biddingHistory;
    console.log(bids);
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Auction Name</TableCell>
              <TableCell>Image</TableCell>
              <TableCell align="right">Base Price</TableCell>
              <TableCell align="right">Bid Price</TableCell>
              <TableCell align="right">Bid Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bids &&
              bids?.map((bid) => (
                <TableRow
                  key={bid._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="auction">
                    {bid?.auctionId?.itemName}
                  </TableCell>
                  <TableCell align="right">
                    <Image
                      width={96}
                      height={96}
                      src={bid.auctionId?.images[0]}
                      alt={bid.auctionId?.itemName}
                    />
                  </TableCell>
                  <TableCell align="right">
                    {bid.auctionId?.basePrice}
                  </TableCell>
                  <TableCell align="right">{bid.bidAmount}</TableCell>
                  <TableCell align="right">
                    {moment(bid?.bidTime).format("lll")}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
