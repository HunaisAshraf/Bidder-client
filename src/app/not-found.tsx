import React from "react";
import { redirect } from "next/navigation";

export default function NotFound() {
  redirect("/404");
  return (
    <div className="h-[90vh] flex justify-center items-center">
      <h1 className="text-gray-500 text-xl md:text-3xl font-bold">
        Page <span className="text-[#231656]">NotFound</span>
      </h1>
    </div>
  );
}
