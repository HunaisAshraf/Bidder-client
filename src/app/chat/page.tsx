"use client";

import { useState, useEffect } from "react";
import ChatComponent from "@/components/ChatComponent";
import ChatListComponent from "@/components/ChatListComponent";
import { axiosInstance } from "@/utils/constants";

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

  return (
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
