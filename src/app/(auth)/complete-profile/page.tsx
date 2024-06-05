"use client";

import { useSearchParams } from "next/navigation";
import React from "react";
import Input from "@/components/Input";

export default function CompleteProfile() {
  const searchParams = useSearchParams();

  const role = searchParams.get("role");

  return (
    <div className="min-h-[75vh] flex justify-center items-center">
      <div className="flex justify-center items-center min-h-[90vh] w-[500px] border bottom-2 shadow-md border-t-0 border-b-0">
        <div className="w-[400px]">
          <div className="py-2 mb-6">
            <h1 className="text-3xl my-4">Complete Your Profile!</h1>
            <p className="text-gray-500">
              For the purpose of industry regulation, your details are required.
            </p>
          </div>
          <div className="py-3">
            <form>
              <div className="py-3">
                <label htmlFor="">Phone Number</label>
                <input type="text" />
              </div>
              <div className="py-3">
                <label htmlFor="">Phone Number</label>
                <input type="text" />
              </div>
              <div className="py-3">
                <label htmlFor="">Phone Number</label>
                <input type="text" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
