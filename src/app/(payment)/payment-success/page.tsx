import React from "react";
import axios from "axios";
import Link from "next/link";
import { cookies } from "next/headers";
import moment from "moment";

export default async function PaymentSuccess({
  searchParams,
}: {
  searchParams: { data: any };
}) {
  const data = JSON.parse(searchParams.data);

  return (
    <div className="flex justify-center items-center min-h-[70vh] ">
      <div className="max-w-md mx-auto p-4 pt-6 pb-8 bg-white rounded shadow-md text-center w-[500px]">
        <h2 className="text-lg font-bold mb-4">Payment Successfull</h2>
        <p className="text-gray-600 mb-4">
          <strong>Thank you!</strong>
        </p>
        <p className="text-gray-600 mb-4">
          $ {data?.data?.amount} {data?.data?.action}
        </p>
        <p className="text-gray-600 mb-8">
          On {moment(data?.data?.time).format("LLL")}
        </p>

        <Link
          href="/profile/wallet"
          className="text-white bg-green-700 px-2 py-2 rounded-md mt-4"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
}
