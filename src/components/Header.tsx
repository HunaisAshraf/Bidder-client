"use client";

import { Badge, Button } from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useLayoutEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setUser, logout } from "@/lib/store/features/userSlice";
import { signOut, useSession } from "next-auth/react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { blue } from "@mui/material/colors";
import { axiosInstance } from "@/utils/constants";
import Image from "next/image";
import { useSocket } from "@/utils/hooks/useSocket";
import { addNotification } from "@/lib/store/features/notificationSlice";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { selectChat } from "@/lib/store/features/chatSlice";
import moment from "moment";

const links = [
  { title: "Home", href: "/" },
  { title: "Auction", href: "/auctions" },
  { title: "Watch List", href: "/watchlist" },
  { title: "Chat", href: "/chat" },
];

function count(notifications: any, userId: any) {
  let count = 0;

  for (let notification of notifications) {
    if (notification.user === userId && !notification.read) {
      count++;
    }
  }

  return count;
}

export default function Header() {
  const [menu, setMenu] = useState(true);
  const [notificationCount, setnotificationCount] = useState(0);
  const [notifications, setNotifications] = useState<any>([]);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const { socket } = useSocket();

  const user = useAppSelector((state) => state?.users?.user);
  const notification = useAppSelector((state) => state?.notification);

  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleMenu = () => {
    setMenu(!menu);
  };

  const handleLogout = async () => {
    try {
      const { data } = await axiosInstance.get("/api/v1/auth/logout");
      localStorage.removeItem("auth");
      localStorage.removeItem("token");
      await signOut();
      dispatch(logout());
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleNotification = async (chatId: string, sender: any) => {
    try {
      await axiosInstance.put(`/api/v1/notification/read-message/${sender}`);

      dispatch(selectChat(chatId));
      setnotificationCount(0);

      handleClose();

      router.push("/chat");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function verifyToken() {
      try {
        let { data } = await axiosInstance.get("/api/v1/auth/verify-token");
        if (!data.success) {
          handleLogout();
        } else {
          router.refresh();
        }
      } catch (error) {
        console.log(error);
        handleLogout();
      }
    }

    const token = localStorage.getItem("token");

    if (token) {
      verifyToken();
    }
  }, [user]);

  useEffect(() => {
    const storedUser = localStorage.getItem("auth");
    if (storedUser && !user?.email) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
    if (user && !user?.role) {
      router.push("/role");
    }
  }, [user, router, session, dispatch]);

  useEffect(() => {
    socket?.on("notification_send", ({ user, newMessage }) => {
      dispatch(addNotification({ user, newMessage }));
    });

    socket?.on("user_blocked", ({ userId }) => {
      if (userId === user?._id) {
        handleLogout();
      }
    });
  }, [socket]);

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const { data } = await axiosInstance.get(
          "/api/v1/notification/get-notification"
        );
        if (data.success) {
          setnotificationCount(count(data.notifications, user?._id));

          setNotifications(data.notifications);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getNotifications();
  }, [socket, notification, router]);

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
            <Badge badgeContent={notificationCount} color="primary">
              <button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                className="text-gray-500 font-semibold"
              >
                Notification
              </button>
            </Badge>
            <Menu
              id="basic-menu"
              className="p-2 scroll-m-7"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {notifications.length === 0 && (
                <div>
                  <p>No new Notification</p>
                </div>
              )}
              {notifications.length > 0 &&
                notifications.map((notify: any) => (
                  <div
                    key={notify._id}
                    onClick={() =>
                      handleNotification(notify.chatId, notify.sender._id)
                    }
                    className={`${
                      !notify.read && "bg-gray-300"
                    } text-slate-800 my-2 px-4 py-2 border-b-2 flex gap-2 cursor-pointer`}
                  >
                    <NotificationsIcon
                      fontSize="medium"
                      sx={{ color: blue[900] }}
                    />
                    <div>
                      <p className="font-semibold text-slate-600">
                        Message from {notify.sender.name}{" "}
                        {!notify.read && (
                          <span className="text-red-500"> new</span>
                        )}
                      </p>
                      <p className=" text-slate-500"> {notify.message}</p>
                      {"    "}
                      <p className="text-xs text-slate-500">
                        {" "}
                        {moment(notify.createdAt).format("lll")}
                      </p>
                    </div>
                  </div>
                ))}
            </Menu>
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
                  <Image
                    width={40}
                    height={40}
                    src={user?.profilePicture}
                    alt={user.name}
                    className=" rounded-full h-10 w-10"
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
