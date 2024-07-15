"use client";

import React, { use, useEffect } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EventIcon from "@mui/icons-material/Event";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "@/lib/store/hooks";
import { adminLogout } from "@/lib/store/features/adminSlice";
import { axiosInstance } from "@/utils/constants";
import { useRouter } from "next/navigation";

const links = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    link: "/admin/dashboard",
  },
  {
    title: "Users",
    icon: <PersonOutlineIcon />,
    link: "/admin/users",
  },
  {
    title: "Auctions",
    icon: <EventIcon />,
    link: "/admin/auctions",
  },
];

export default function SideBar() {
  const pathName = usePathname();

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axiosInstance.get("/api/v1/auth/admin-logout");

      dispatch(adminLogout());

      router.replace("/admin");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <aside className="md:min-h-screen p-4 flex md:flex-col items-center justify-between">
      <div className="md:text-2xl font-semibold text-slate-700 md:mb-4">
        Bidder
      </div>
      <div className="flex md:flex-col justify-between items-center md:flex-grow md:mt-10">
        <div className="flex md:flex-col">
          {links.map((link) => {
            const isActive = pathName === link.link ? true : false;
            return (
              <Link href={link.link} key={link.title}>
                <div
                  className={`${
                    isActive ? "bg-blue-600 text-white " : ""
                  } flex items-center text-slate-700 p-2 hover:bg-blue-400 hover:text-white rounded-md cursor-pointer my-3`}
                >
                  {link.icon}
                </div>
              </Link>
            );
          })}
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center text-slate-700 p-2  hover:bg-blue-500 hover:text-white rounded md:mt-4"
        >
          <LogoutIcon />
        </button>
      </div>
    </aside>
  );
}
