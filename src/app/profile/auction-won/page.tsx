import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import moment from "moment";
import { cookies, headers } from "next/headers";
import Image from "next/image";
import React from "react";

type Auctions = {
  _id: string;
  auctionItem: {
    itemName: string;
    basePrice: string;
    description: string;
    images: string[];
  };
  bidAmount: number;
};

async function getData() {
  try {
    const token = cookies().get("token");

    let auctions;

    let { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/auction/auction-won`,
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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Auction Name</TableCell>
              <TableCell>Image</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Base Price</TableCell>
              <TableCell align="right">Bid Price</TableCell>
              {/* <TableCell align="right">Bid Date</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {auctions &&
              auctions?.map((auction) => (
                <TableRow
                  key={auction._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="auction">
                    {auction?.auctionItem.itemName}
                  </TableCell>
                  <TableCell align="right">
                    <Image
                      width={96}
                      height={96}
                      src={auction.auctionItem.images[0]}
                      alt={auction.auctionItem.itemName}
                    />
                  </TableCell>
                  <TableCell align="right">
                    {auction.auctionItem.description}
                  </TableCell>
                  <TableCell align="right">
                    {auction.auctionItem.basePrice}
                  </TableCell>
                  <TableCell align="right">{auction.bidAmount}</TableCell>
                  {/* <TableCell align="right">
                    {moment(auction?.).format("lll")}
                  </TableCell> */}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
