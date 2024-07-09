"use client";

import AdminLayout from "@/components/Layout/AdminLayout";
import { adminAxiosInstance } from "@/utils/constants";
import { Auction, User } from "@/utils/types";
import {
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Image from "next/image";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import SearchIcon from "@mui/icons-material/Search";

export default function Auctions() {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [filter, setFilter] = useState<string | null>(null);
  const [change, setChange] = useState(false);
  const [search, setSearch] = useState("");

  const filterAuctions = async () => {
    try {
      const { data } = await adminAxiosInstance.get(
        `/api/auction/filter-auction/?filter=${filter}&page=${page}`
      );
      if (data.success) {
        console.log(data);

        setAuctions(data.auctions);
        setCount(data.count);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const verifyAuction = async (id: string) => {
    try {
      const { data } = await adminAxiosInstance.put(
        `/api/auction/verify-auction/${id}`
      );

      if (data.success) {
        toast.success(data.message);
        setChange(!change);
      }
    } catch (error) {
      toast.error("failed to veruify auction");
    }
  };

  const handleStatus = async (id: string) => {
    try {
      console.log("aldksfjkl");

      const { data } = await adminAxiosInstance.put(
        `/api/auction/block-auction/${id}`
      );

      if (data.success) {
        toast.success(data.message);
        setChange(!change);
      }
    } catch (error) {
      toast.error("failed to block/unblock auction");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const { data } = await adminAxiosInstance.get(
        `/api/auction/search-auction/?search=${search}`
      );

      if (data.success) {
        setAuctions(data.auctions);
        setCount(data.auctions.length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getAuctions = async () => {
      try {
        const { data } = await adminAxiosInstance.get(
          `/api/auction/admin-get-auction/?page=${page}`
        );
        if (data.success) {
          console.log(data.auctions);

          setAuctions(data.auctions);
          setCount(data.count);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (filter) {
      filterAuctions();
    } else {
      getAuctions();
    }
  }, [page, filter, change]);
  return (
    <AdminLayout>
      <Toaster />
      <div className="p-3 flex justify-between bg-white">
        <h1 className="text-2xl font-semibold ">All Auctions</h1>
        <form className="flex" onSubmit={handleSubmit}>
          <input
            className="outline-none shadow-md px-4 py-2 rounded-l-md w-[200px] md:w-[400px]"
            placeholder="Search..."
            type="text"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="bg-[#231656] text-white py-2 px-4 rounded-r-md font-semibold">
            <SearchIcon />
          </button>
        </form>
        <select
          onChange={(e) => setFilter(e.target.value)}
          className="bg-[#F9FBFF]  outline-none  border-2 border-[#a7bbe3] rounded-sm px-3 py-2"
        >
          <option value="" defaultValue="">
            Sort
          </option>
          <option value="live">Live</option>
          <option value="completed">Completed</option>
          <option value="verified">Verified</option>
          <option value="notVerified">Not Verified</option>
        </select>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell> #</TableCell>
              <TableCell> Name</TableCell>
              <TableCell> Image</TableCell>
              <TableCell>Base Price</TableCell>
              <TableCell>Auctioner</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Verification</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {auctions?.length === 0 && (
                <TableCell className="text-center font-semibold text-1xl my-5">
                  No auctions found.....
                </TableCell>
              )}
            </TableRow>
            {auctions?.map((auction, index) => (
              <TableRow
                key={auction._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell component="th" scope="row">
                  {auction.itemName}
                </TableCell>
                <TableCell className="flex gap-2">
                  {auction.images.map((img) => (
                    <Image
                      key={img}
                      src={img}
                      width={70}
                      height={70}
                      alt={img}
                    />
                  ))}
                </TableCell>
                <TableCell>{auction.basePrice}</TableCell>
                <TableCell>{auction.auctioner.name}</TableCell>
                <TableCell>{auction.description}</TableCell>
                <TableCell>
                  {auction.isVerified ? (
                    <button className=" border-2  py-2 px-3 rounded-sm">
                      Verified
                    </button>
                  ) : (
                    <button
                      onClick={() => verifyAuction(auction._id)}
                      className="bg-[#231656] text-white font-semibold border-2  py-2 px-3 rounded-sm"
                    >
                      Verify
                    </button>
                  )}
                </TableCell>
                <TableCell>
                  {auction.isBlocked ? (
                    <button
                      onClick={() => handleStatus(auction._id)}
                      className="bg-red-500 border-2 border-red-900 text-white py-2 px-3 rounded-sm"
                    >
                      Blocked
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStatus(auction._id)}
                      className="bg-green-500 border-2 border-green-800 py-2 px-3 rounded-sm"
                    >
                      Active
                    </button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="my-2">
        {count / 5 > 1 && (
          <Pagination
            count={Math.ceil(count / 5)}
            page={page}
            onChange={(event, value) => setPage(value)}
          />
        )}
      </div>
    </AdminLayout>
  );
}
