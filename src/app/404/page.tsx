"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function page() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/");
  };

  return (
    <div className="h-[90vh] flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-gray-500 text-xl md:text-3xl font-bold">
          Page <span className="text-[#231656]">NotFound</span>
        </h1>
        <button
          className="my-2 p-2 bg-[#231656] font-semibold text-white"
          onClick={handleRedirect}
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
