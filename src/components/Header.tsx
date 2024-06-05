"use client";

import { Button } from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setUser, logout } from "@/lib/store/features/userSlice";
import { signOut, useSession } from "next-auth/react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { blue } from "@mui/material/colors";
import { axiosInstance } from "@/utils/constants";

const links = [
  { title: "Home", href: "/" },
  { title: "Auction", href: "/auctions" },
  { title: "Watch List", href: "/watchlist" },
  { title: "Chat", href: "/chat" },
  { title: "Notification", href: "/notification" },
];

export default function Header() {
  const [menu, setMenu] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  const user = useAppSelector((state) => state?.users?.user);

  const dispatch = useAppDispatch();

  const toggleMenu = () => {
    setMenu(!menu);
  };

  const handleLogout = async () => {
    try {
      const { data } = await axiosInstance.get("/api/auth/logout");
      localStorage.removeItem("auth");
      localStorage.removeItem("token");
      await signOut();
      dispatch(logout());
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (session?.user) {
  //     const userData = {
  //       name: session.user.name,
  //       email: session.user.email,
  //       profilePicture: session.user.image,
  //     };

  //     localStorage.setItem("auth", JSON.stringify(userData));
  //     dispatch(setUser(userData));
  //   }
  // }, [, dispatch]);

  useEffect(() => {
    const storedUser = localStorage.getItem("auth");
    if (storedUser && !user?.email) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [session, dispatch, user?.email]);

  return (
    <header className="bg-white py-3">
      <nav className="flex justify-between items-center w-[92%]  mx-auto">
        <div>
          <Link href="/">
            <h1 className="font-semibold text-3xl text-gray-600">BIDDER</h1>
          </Link>
        </div>
        <div
          className={`nav-links duration-500 md:static absolute bg-white md:min-h-fit min-h-[60vh] left-0 ${
            menu ? "top-[-100%]" : "top-[9%]"
          } md:w-auto  w-full flex items-center px-5`}
        >
          <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
            {links.map((l) => {
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
        <div className="flex items-center gap-6">
          {!user?.email ? (
            <>
              <Button
                onClick={() => router.push("/login")}
                className="font-bold "
                variant="outlined"
              >
                SignIn
              </Button>
              <Button
                onClick={() => router.push("/signup")}
                className="font-bold bg-blue-600"
                variant="contained"
              >
                SignUp
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={handleLogout}
                className="font-bold bg-blue-600"
                variant="contained"
              >
                Logout
              </Button>

              <button onClick={() => router.push("/profile/details")}>
                {user.profilePicture ? (
                  <img
                    src={user?.profilePicture}
                    alt={user.name}
                    className="h-10 w-10 rounded-full"
                  />
                ) : (
                  <AccountCircleIcon
                    fontSize="large"
                    sx={{ color: blue[800] }}
                  />
                )}
              </button>
            </>
          )}
          <button className="md:hidden" onClick={toggleMenu}>
            {menu ? (
              <MenuIcon className="text-3xl cursor-pointer " />
            ) : (
              <CloseIcon className="text-3xl cursor-pointer " />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
