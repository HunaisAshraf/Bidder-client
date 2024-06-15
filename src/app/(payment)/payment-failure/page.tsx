import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="flex justify-center items-center min-h-[70vh] ">
      <div className="max-w-md mx-auto p-4 pt-6 pb-8 bg-white rounded shadow-md text-center w-[500px]">
        <h2 className="text-lg font-bold mb-4">Payment Failed</h2>

        <Link
          href="/profile/wallet"
          className="text-white bg-red-700 px-2 py-2 rounded-md mt-4"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
}
