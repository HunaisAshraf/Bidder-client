// import ChatComponent from "@/components/ChatComponent";
// import ChatListComponent from "@/components/ChatListComponent";
// import axios from "axios";
// import { cookies } from "next/headers";

// async function getChat() {
//   try {
//     const token = cookies().get("token");
//     const { data } = await axios.get(
//       `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/chat/get-chat`,
//       {
//         headers: {
//           Authorization: `Bearer ${token?.value}`,
//         },
//       }
//     );
//     console.log(data);
//     return data.chat;
//   } catch (error) {
//     console.log(error);
//   }
// }

// export default async function Chat() {
//   const chats = await getChat();
//   return (

//     <div className="flex flex-col sm:flex-row my-3 mx-4 md:mx-12 lg:mx-36">
//       <div className="w-full sm:w-1/4 min-h-[85vh] shadow-lg p-4 mb-4 sm:mb-0">
//         <ChatListComponent chats={chats} />
//       </div>
//       <div className="w-full sm:w-3/4 min-h-[85vh] shadow-lg p-4">
//         <ChatComponent />
//       </div>
//     </div>

//   );
// }

"use client";

import { useState, useEffect } from "react";
import ChatComponent from "@/components/ChatComponent";
import ChatListComponent from "@/components/ChatListComponent";
import axios from "axios";
import { axiosInstance } from "@/utils/constants";

// import { cookies } from "next/headers";

// async function getChat() {
//   try {
//     const token = cookies().get("token");
//     const { data } = await axios.get(
//       `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/chat/get-chat`,
//       {
//         headers: {
//           Authorization: `Bearer ${token?.value}`,
//         },
//       }
//     );
//     return data.chat;
//   } catch (error) {
//     console.log(error);
//   }
// }

export default function Chat() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      const { data } = await axiosInstance.get("/api/v1/chat/get-chat");
      setChats(data.chat);
    };
    fetchChats();
  }, []);

  const handleChatSelect = (chat: any) => {
    setSelectedChat(chat);
  };

  const handleBack = () => {
    setSelectedChat(null);
  };

  return (
    // <div className="flex flex-col sm:flex-row my-3 mx-4 md:mx-12 lg:mx-36">
    //   <div className="w-full sm:w-1/4 min-h-[85vh] shadow-lg p-4 mb-4 sm:mb-0">
    //     <ChatListComponent chats={chats} onChatSelect={handleChatSelect} />
    //   </div>
    //   <div
    //     className={`w-full sm:w-3/4 min-h-[85vh] shadow-lg p-4 ${
    //       selectedChat ? "" : "hidden sm:block"
    //     }`}
    //   >
    //     <ChatComponent />
    //   </div>
    // </div>
    // <div className="flex flex-col sm:flex-row my-3 mx-4 md:mx-12 lg:mx-36">
    //   {!selectedChat && (
    //     <div className="w-full sm:w-1/4 min-h-[85vh] shadow-lg p-4 mb-4 sm:mb-0">
    //       <ChatListComponent chats={chats} onChatSelect={handleChatSelect} />
    //     </div>
    //   )}
    //   {selectedChat && (
    //     <div className="w-full sm:w-3/4 min-h-[85vh] shadow-lg p-4">
    //       {/* <button onClick={handleBack} className="sm:hidden mb-4">
    //         Back
    //       </button> */}
    //       <ChatComponent onChatSelect={setSelectedChat} />
    //     </div>
    //   )}
    // </div>

    <div className="flex flex-col md:flex-row my-3 mx-4 md:mx-12 lg:mx-36">
      <div
        className={`w-full md:w-1/4 min-h-[85vh] shadow-lg p-4 mb-4 md:mb-0 ${
          selectedChat && "hidden sm:block"
        }`}
      >
        <ChatListComponent chats={chats} onChatSelect={handleChatSelect} />
      </div>
      <div
        className={`w-full md:w-3/4 min-h-[85vh] shadow-lg p-4 ${
          !selectedChat && "hidden sm:block"
        }`}
      >
        {selectedChat ? (
          <>
            {/* <button onClick={handleBack} className="sm:block md:hidden mb-4">
              Back
            </button> */}
            <ChatComponent onChatSelect={handleChatSelect} />
          </>
        ) : (
          <div className="h-full flex justify-center items-center">
            <h1 className="text-gray-500 text-xl md:text-3xl font-bold">
              No Chat <span className="text-[#231656]">Selected</span>
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}
