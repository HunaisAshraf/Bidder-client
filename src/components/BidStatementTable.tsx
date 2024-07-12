"use client";
import moment from "moment";
import React, { useRef } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";

export default function BidStatementTable({
  data,
  auction,
}: {
  data: any;
  auction: any;
}) {
  const tableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: `${data.auctionData.auctionItem.itemName}`,
    sheet: "Bids",
  });

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold mb-4">Bids</h2>

        <button
          onClick={onDownload}
          className="bg-blue-800 p-2 text-white font-semibold rounded-sm"
        >
          Download
        </button>
      </div>
      <div className="relative overflow-x-auto">
        <table
          ref={tableRef}
          className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr className="hidden">
              <th>Item</th>
              <th>Base Price</th>
              <th>Final Price</th>
              <th>Auction Winner</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>

            <tr className="hidden">
              <td>{auction.item}</td>
              <td>{auction.basePrice}</td>
              <td>{auction.bidAmount}</td>
              <td>{auction.winner}</td>
              <td>{moment(auction.startDate).format("lll")}</td>
              <td>{moment(auction.endDate).format("lll")}</td>
            </tr>
            <tr></tr>
            <tr></tr>
            <tr></tr>

            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Time
              </th>
              <th scope="col" className="px-6 py-3">
                Bidder ID
              </th>
              <th scope="col" className="px-6 py-3">
                Bidder Name
              </th>
            </tr>
          </thead>
          <tbody>
            {data.bidsData.map((bid: any, index: number) => (
              <tr className="bg-white border-b" key={bid._id}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {index + 1}
                </th>
                <td className="px-6 py-4 text-gray-900">${bid.bidAmount}</td>
                <td className="px-6 py-4 text-gray-900">
                  {moment(bid.bidTime).format("lll")}
                </td>
                <td className="px-6 py-4 text-gray-900">{bid.userId._id}</td>
                <td className="px-6 py-4 text-gray-900">{bid.userId.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
