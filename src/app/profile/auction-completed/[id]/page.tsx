import BidStatementTable from "@/components/BidStatementTable";
import axios from "axios";
import { cookies } from "next/headers";
import Image from "next/image";
import React from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";

const getData = async (id: string) => {
  try {
    const token = cookies().get("token");
    const headers = {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    };

    const bids = axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/auction/get-bids/${id}`,
      headers
    );
    const auction = axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/auction/auction-won/${id}`,
      headers
    );

    const [auctionResponse, bidResponse] = await Promise.all([auction, bids]);

    return {
      auctionData: auctionResponse.data.auction,
      bidsData: bidResponse.data.bids,
    };
  } catch (error) {
    console.log(error);
  }
};

export default async function Statement({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);

  const winData = {
    item: data?.auctionData.auctionItem.itemName,
    description: data?.auctionData.auctionItem.description,
    basePrice: data?.auctionData.auctionItem.basePrice,
    bidAmount: data?.auctionData.bidAmount,
    winner: data?.auctionData.user.name,
    startDate: data?.auctionData.auctionItem.startDate,
    endDate: data?.auctionData.auctionItem.endDate,
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Auction Details</h1>
      {data ? (
        <div className="md:flex justify-between bg-white shadow-sm rounded-md p-6 mb-6">
          <div className="w-full">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Detail
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Information
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      Item
                    </th>
                    <td className="px-6 py-4 text-gray-900">
                      {data.auctionData.auctionItem.itemName}
                    </td>
                  </tr>
                  <tr className="bg-white border-b">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      Description
                    </th>
                    <td className="px-6 py-4 text-gray-900">
                      {data.auctionData.auctionItem.description}
                    </td>
                  </tr>
                  <tr className="bg-white border-b">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      Base Price
                    </th>
                    <td className="px-6 py-4 text-gray-900">
                      ${data.auctionData.auctionItem.basePrice}
                    </td>
                  </tr>
                  <tr className="bg-white border-b">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      Winning Bid
                    </th>
                    <td className="px-6 py-4 text-gray-900">
                      ${data.auctionData.bidAmount}
                    </td>
                  </tr>
                  <tr className="bg-white border-b">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      Winner
                    </th>
                    <td className="px-6 py-4 text-gray-900">
                      {data.auctionData.user.name}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="ml-6">
            <Image
              src={data.auctionData.auctionItem.images[0]}
              width={800}
              height={300}
              alt={data.auctionData.auctionItem.itemName}
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      ) : (
        <p>Loading auction details...</p>
      )}

      {data && data.bidsData.length > 0 ? (
        <BidStatementTable auction={winData} data={data} />
      ) : (
        <p>No bids available.</p>
      )}
    </div>
  );
}
