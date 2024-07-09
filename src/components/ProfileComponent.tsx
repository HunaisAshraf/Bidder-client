"use client";

import { useAppSelector } from "@/lib/store/hooks";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import EditProfileComponent from "./EditProfileComponent";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { Router } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";

const links = [
  { title: "My Details", href: "/profile/details" },
  {
    title: "Bidding History",
    href: "/profile/bidding-history",
    role: "bidder",
  },

  { title: "Auctions", href: "/profile/auctions", role: "auctioner" },
  {
    title: "Auction Completed",
    href: "/profile/auction-completed",
    role: "auctioner",
  },
  { title: "Auction Won", href: "/profile/auction-won", role: "bidder" },
  { title: "Watch List", href: "/profile/watchlist", role: "bidder" },
  { title: "Wallet", href: "/profile/wallet" },
  { title: "Address", href: "/profile/address", role: "bidder" },
];

export default function ProfileComponent() {
  const user = useAppSelector((state) => state.users.user);
  const pathname = usePathname();
  const router = useRouter();
  const [redirected, setRedirected] = useState(false);

  const filteredLink = links.filter(
    (link) => link.role === user?.role || !link.role
  );

  useEffect(() => {
    const currentLink = links.find((link) => link.href === pathname);
    if (
      !redirected &&
      currentLink &&
      currentLink.role &&
      currentLink.role !== user?.role
    ) {
      router.push("/profile/details");
      setRedirected(true);
    }
  }, [pathname, user?.role, router, redirected]);

  return (
    <div className="">
      <div className="flex items-center gap-3">
        {user?.profilePicture ? (
          <Image
            width={160}
            height={160}
            src={user?.profilePicture}
            alt={user?.name}
            className="rounded-full md:h-36 md:w-36"
          />
        ) : (
          <>
            <AccountCircleIcon sx={{ fontSize: 200 }} />
          </>
        )}
        <p className="text-3xl font-semibold">{user?.name}</p>
        <EditProfileComponent />
      </div>
      <div className="my-10">
        <ul className="flex items-center gap-6">
          {filteredLink.map((l) => {
            const isActive = pathname === l.href ? true : false;
            return (
              <li key={l.title}>
                <Link
                  key={l.title}
                  className={
                    isActive
                      ? "text-blue-600 font-semibold"
                      : "text-gray-500 font-semibold"
                  }
                  href={l.href}
                >
                  {l.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
