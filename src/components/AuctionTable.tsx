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

type Auction = {
  _id: string;
  itemName: string;
  basePrice: number;
  description: string;
  startDate: Date;
  endDate: Date;
  images: string[];
  isListed: string;
};

// function createData(
//   name: string,
//   price: number,
//   description: string,
//   startDate: number,
//   endDate: number,
//   images: string[],
//   status: number
// ) {
//   return { name, price, description, startDate, endDate, images, status };
// }

// const rows = [
//   // createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   // createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   // createData("Eclair", 262, 16.0, 24, 6.0),
//   // createData("Cupcake", 305, 3.7, 67, 4.3),
//   // createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

export default function AuctionTable() {
  const [auctions, setAuctions] = React.useState<Auction[]>();
  const [dataChange, setDataChange] = React.useState(false);
  console.log("all auct", auctions);
  const router = useRouter();
  const getAuctions = async () => {
    try {
      const { data } = await axiosInstance.get("/api/auction/get-auctions");

      console.log(data);
      if (data.success) {
        setAuctions(data?.auctions);
        console.log("auction", auctions);

        // for (let auction of data?.auctions) {
        //   rows.push(
        //     createData(
        //       auction?.itemName,
        //       auction?.basePrice,
        //       auction?.description,
        //       auction?.startDate,
        //       auction?.endDate,
        //       auction?.images,
        //       auction?.status
        //     )
        //   );
        // }
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
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
              <TableCell align="right">Base Price</TableCell>
              <TableCell align="right">Start Date</TableCell>
              <TableCell align="right">End Date</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Action</TableCell>
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
                <TableCell align="right">
                  <img
                    className="h-24 w-24"
                    src={auction?.images[0]}
                    alt={auction?.itemName}
                  />
                </TableCell>
                <TableCell align="right">{auction?.basePrice}</TableCell>
                <TableCell align="right">
                  {moment(auction?.startDate).format("lll")}
                </TableCell>
                <TableCell align="right">
                  {moment(auction?.endDate).format("lll")}
                </TableCell>
                <TableCell align="right">
                  {auction?.isListed ? (
                    <span className="bg-green-500 text-white font-semibold py-2 px-3 rounded">
                      listed
                    </span>
                  ) : (
                    <span className="bg-red-500 text-white font-semibold py-2 px-3 rounded">
                      {" "}
                      notlisted
                    </span>
                  )}
                </TableCell>
                <TableCell align="right">
                  <EditAuctionModal id={auction._id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
