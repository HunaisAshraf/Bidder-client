"use client";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddAuctionModal from "./AddAuctionModal";
import { axiosInstance } from "@/utils/constants";
import moment from "moment";
import EditAuctionModal from "./EditAuctonModal";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";

type Auction = {
  _id: string;
  itemName: string;
  basePrice: number;
  description: string;
  startDate: Date;
  endDate: Date;
  images: string[];
  isListed: string;
  completed: boolean;
  isBlocked: boolean;
  isVerified: boolean;
};

export default function AuctionTable() {
  const [auctions, setAuctions] = React.useState<Auction[]>();
  const [dataChange, setDataChange] = React.useState(false);
  const router = useRouter();

  const handleChangeStatus = async (id: string) => {
    try {
      const { data } = await axiosInstance.put(
        `/api/v1/auction/auction-status/${id}`
      );
      if (data.success) {
        toast.success("status changed successfully");
        setDataChange(!dataChange);
      }
    } catch (error) {
      console.log(error);
      toast.error("failed to change status");
    }
  };

  React.useEffect(() => {
    const getAuctions = async () => {
      try {
        const { data } = await axiosInstance.get(
          "/api/v1/auction/get-auctions"
        );

        if (data.success) {
          setAuctions(data?.auctions);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAuctions();
  }, [dataChange]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">Auctions</h1>

        <AddAuctionModal change={dataChange} setChange={setDataChange} />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Auction Name</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Base Price</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Verification</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {auctions?.map((auction) => (
              <TableRow
                key={auction._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="auction">
                  {auction?.itemName}
                </TableCell>
                <TableCell>
                  <Image
                    width={96}
                    height={96}
                    src={auction?.images[0]}
                    alt={auction?.itemName}
                  />
                </TableCell>
                <TableCell>{auction?.basePrice}</TableCell>
                <TableCell>
                  {moment(auction?.startDate).format("lll")}
                </TableCell>
                <TableCell>{moment(auction?.endDate).format("lll")}</TableCell>
                <TableCell>
                  {auction.isBlocked ? (
                    <button className="bg-red-500 text-white font-semibold py-2 px-3 rounded">
                      Blocked
                    </button>
                  ) : (
                    <>
                      {auction.isVerified ? (
                        <button className=" border-2  py-2 px-3 rounded-sm">
                          Verified
                        </button>
                      ) : (
                        <button className="bg-[#231656] text-white font-semibold border-2  py-2 px-3 rounded-sm">
                          Requested
                        </button>
                      )}
                    </>
                  )}
                </TableCell>
                <TableCell>
                  {auction?.completed ? (
                    <span className="bg-yellow-500 text-white font-semibold py-2 px-3 rounded">
                      Completed
                    </span>
                  ) : (
                    <button onClick={() => handleChangeStatus(auction._id)}>
                      {auction?.isListed ? (
                        <span className="bg-green-500 text-white font-semibold py-2 px-3 rounded">
                          listed
                        </span>
                      ) : (
                        <span className="bg-red-500 text-white font-semibold py-2 px-3 rounded">
                          Unlisted
                        </span>
                      )}
                    </button>
                  )}
                </TableCell>
                <TableCell>
                  <EditAuctionModal
                    change={dataChange}
                    setChange={setDataChange}
                    id={auction._id}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
