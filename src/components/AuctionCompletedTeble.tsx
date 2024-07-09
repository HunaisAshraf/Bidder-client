"use client";

import React from "react";
import {
  Box,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { User } from "@/utils/types";
import { useRouter } from "next/navigation";

type Auctions = {
  _id: string;
  auctionItem: {
    _id: string;
    itemName: string;
    basePrice: string;
    description: string;
    images: string[];
    endDate: Date;
  };
  user: User;
  bidAmount: number;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AuctionCompletedTable({
  auctions,
}: {
  auctions: Auctions[];
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Auction Name</TableCell>
              <TableCell>Image</TableCell>
              <TableCell align="right">Bidder</TableCell>
              <TableCell align="right">Base Price</TableCell>
              <TableCell align="right">Bid Price</TableCell>
              <TableCell align="right">Statement</TableCell>
              {/* <TableCell align="right">Invoice</TableCell> */}
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
                    {auction?.auctionItem?.itemName}
                  </TableCell>
                  <TableCell align="right">
                    <Image
                      width={96}
                      height={96}
                      src={auction.auctionItem?.images[0]}
                      alt={auction.auctionItem?.itemName}
                    />
                  </TableCell>
                  <TableCell align="right">{auction.user.name}</TableCell>
                  <TableCell align="right">
                    {auction.auctionItem?.basePrice}
                  </TableCell>
                  <TableCell align="right">{auction.bidAmount}</TableCell>
                  <TableCell align="right">
                    <button
                      onClick={() =>
                        router.push(
                          `/profile/auction-completed/${auction.auctionItem._id}`
                        )
                      }
                      className="bg-blue-800 p-2 text-white font-semibold rounded-sm"
                    >
                      Statement
                    </button>
                  </TableCell>

                  {/* <TableCell align="right">
                    {moment(auction?.).format("lll")}
                    </TableCell> */}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
