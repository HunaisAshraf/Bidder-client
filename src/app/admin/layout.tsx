import AdminLayout from "@/components/Layout/AdminLayout";
import SideBar from "@/components/admin/sidebar";
import { headers } from "next/headers";
import React, { ReactNode } from "react";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const header = headers();
  // const route = header.get("x-url");
  // let isProtected;
  // if (route) {
  //   console.log(route);

  //   isProtected = /^\/admin\/.*$/.test(route);
  //   console.log(isProtected);
  // }
  return (
    <div className="flex">
      {/* {isProtected ? (
        <AdminLayout>{children}</AdminLayout>
      ) : ( */}
      <div>{children}</div>
      {/* )} */}
    </div>
  );
}
