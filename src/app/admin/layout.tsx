import AdminLayout from "@/components/Layout/AdminLayout";
import SideBar from "@/components/admin/sidebar";
import { headers } from "next/headers";
import React, { ReactNode } from "react";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <div>{children}</div>
    </div>
  );
}
