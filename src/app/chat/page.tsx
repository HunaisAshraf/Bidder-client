import ChatComponent from "@/components/ChatComponent";
import ChatListComponent from "@/components/ChatListComponent";
import axios from "axios";
import { cookies } from "next/headers";

async function getChat() {
  try {
    const token = cookies().get("token");
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/chat/get-chat`,
      {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      }
    );
    console.log(data);
    return data.chat;
  } catch (error) {
    console.log(error);
  }
}

export default async function Chat() {
  const chats = await getChat();
  return (
    // <div className="flex flex-col sm:flex-row my-3 mx-4 md:mx-12 lg:mx-36">
    //   <div className="w-full sm:w-1/4 min-h-[85vh] shadow-lg p-4 mb-4 md:mb-0">
    //     <ChatListComponent chats={chats} />
    //   </div>
    //   <div className="w-full sm:w-3/4 min-h-[85vh] shadow-lg p-4">
    //     <ChatComponent />
    //   </div>
    // </div>
    <div className="flex flex-col sm:flex-row my-3 mx-4 md:mx-12 lg:mx-36">
      <div className="w-full sm:w-1/4 min-h-[85vh] shadow-lg p-4 mb-4 sm:mb-0">
        <ChatListComponent chats={chats} />
      </div>
      <div className="w-full sm:w-3/4 min-h-[85vh] shadow-lg p-4">
        <ChatComponent />
      </div>
    </div>
  );
}
