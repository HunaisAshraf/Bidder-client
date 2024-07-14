import React from "react";

export default function Loading() {
  return (
    <div className="mx-6 md:mx-16 lg:mx-32 min-h-[91vh] mt-2 md:mt-5">
      <div className="flex flex-col md:flex-row shadow-md p-3 w-full">
        <div className="shadow-md p-3 w-full md:w-1/2">
          <div className="animate-pulse h-96 bg-gray-300 rounded-md"></div>
          <div className="flex gap-3 my-3">
            <div className="animate-pulse h-28 w-32 bg-gray-300 rounded-md"></div>
            <div className="animate-pulse h-28 w-32 bg-gray-300 rounded-md"></div>
            <div className="animate-pulse h-28 w-32 bg-gray-300 rounded-md"></div>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-3">
          <div className="animate-pulse bg-gray-300 h-8 rounded-md mx-auto md:mx-32 my-3"></div>
          <div className="animate-pulse bg-gray-300 h-8 rounded-md mx-auto md:mx-32 my-3"></div>
          <div className="animate-pulse bg-gray-300 h-8 rounded-md mt-14"></div>
          <div className="animate-pulse bg-gray-300 h-32 rounded-md mt-5"></div>
          <div className="flex mt-5 gap-3">
            <div className="animate-pulse bg-gray-300 h-8 rounded-md w-1/2"></div>
            <div className="animate-pulse bg-gray-300 h-8 rounded-md w-1/2"></div>
          </div>
          <div className="flex mt-6 gap-3">
            <div className="animate-pulse bg-gray-300 h-12 rounded-full w-1/2"></div>
            <div className="animate-pulse bg-gray-300 h-12 rounded-full w-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
