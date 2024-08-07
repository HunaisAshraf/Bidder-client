import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center flex-wrap mx-4 sm:mx-8 md:mx-16 lg:mx-36">
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="animate-pulse p-3 shadow-lg flex gap-3 w-full sm:w-1/2 lg:w-1/3 my-3"
          >
            <div className="h-36 bg-gray-300 w-1/2"></div>
            <div className="w-1/2 px-5">
              <div className="h-6 bg-gray-300 w-full my-2"></div>
              <div className="h-6 bg-gray-300 w-full my-2"></div>
              <div className="h-6 bg-gray-300 w-full my-2"></div>
              <div className="h-12 bg-gray-300 w-full my-2"></div>
            </div>
          </div>
        ))}
    </div>
  );
}
