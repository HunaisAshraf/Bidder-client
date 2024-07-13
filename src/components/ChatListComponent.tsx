"use client";

import { selectChat, setChatUser } from "@/lib/store/features/chatSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { User } from "@/utils/types";
import Image from "next/image";
import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

type Chats = {
  _id: string;
  users: User[];
};

export default function ChatListComponent({ chats }: { chats: Chats[] }) {
  // const [chats, setChats] = useState();
  const currUser = useAppSelector((state) => state.users.user);
  const dispatch = useAppDispatch();

  return (
    // <div className="">
    //   <h1 className="text-3xl font-semibold my-4 ">Messages</h1>

    //   {chats?.map((chat) =>
    //     chat.users.map((user) => {
    //       if (user.email !== currUser?.email) {
    //         return (
    //           <div
    //             key={user.email}
    //             className="flex justify-between items-center mx-6 my-2 py-2 border-b-2 cursor-pointer"
    //             onClick={() => {
    //               dispatch(selectChat(chat._id));
    //               dispatch(setChatUser(user));
    //             }}
    //           >
    //             {user.profilePicture ? (
    //               <Image
    //                 src={user?.profilePicture!}
    //                 alt="profile"
    //                 width={40}
    //                 height={40}
    //                 className="rounded-full"
    //               />
    //             ) : (
    //               <AccountCircleIcon sx={{ fontSize: 30 }} />
    //             )}
    //             <h1>{user.name}</h1>
    //             <p className="text-gray-400 text-sm">{}</p>
    //           </div>
    //         );
    //       }
    //     })
    //   )}
    // </div>

    <div className="p-4 sm:p-6 md:p-8 lg:p-10">
      <h1 className="text-2xl sm:text-3xl font-semibold my-4">Messages</h1>

      {chats?.map((chat) =>
        chat.users.map((user) => {
          if (user.email !== currUser?.email) {
            return (
              <div
                key={user.email}
                className="flex justify-between items-center p-2 sm:p-4 my-2 border-b-2 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => {
                  dispatch(selectChat(chat._id));
                  dispatch(setChatUser(user));
                }}
              >
                {user.profilePicture ? (
                  <Image
                    src={user.profilePicture}
                    alt="profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <AccountCircleIcon sx={{ fontSize: 40 }} />
                )}
                <div className="ml-4 flex-1">
                  <h1 className="text-sm sm:text-base">{user.name}</h1>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    {user.email}
                  </p>
                </div>
              </div>
            );
          }
        })
      )}
    </div>
  );
}
