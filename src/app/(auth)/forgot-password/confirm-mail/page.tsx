import Link from "next/link";
import React from "react";

export default function ConfirmMail() {
  return (
    <div>
      <div className="lg:mx-96 md:shadow-lg flex justify-center items-center min-h-[91vh]">
        <div>
          <h1 className="text-3xl text-[#231656] font-semibold my-5">
            Verify Mail
          </h1>
          <p className="my-2 text-gray-500">
            Check your mail for resetting the password
          </p>
          <Link
            href="/forgot-password"
            className="bg-[#231656] text-white py-2 px-4 rounded-md font-semibold"
          >
            resend
          </Link>
        </div>
      </div>
    </div>
  );
}
