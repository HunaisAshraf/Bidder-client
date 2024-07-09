"use client";

import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useAppSelector } from "@/lib/store/hooks";
import Image from "next/image";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { blue } from "@mui/material/colors";

export default function AdminHeader() {
  const admin = useAppSelector((state) => state.admin.admin);

  return (
    <div className="hidden md:flex w-full md:justify-end py-3 px-10 gap-4">
      <NotificationsIcon fontSize="medium" sx={{ color: blue[900] }} />
      {admin?.profilePicture ? (
        <Image
          src={admin?.profilePicture!}
          width={50}
          height={50}
          alt={admin?.name!}
        ></Image>
      ) : (
        <AccountCircleIcon fontSize="medium" sx={{ color: blue[900] }} />
      )}
    </div>
  );
}
