"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>();

  useEffect(() => {

    console.log();
    
    const socket = io(process.env.NEXT_PUBLIC_SERVER_HOST as string, {
      withCredentials: true,
    });
    

    setSocket(socket);

    socket.on("connect", () => {
      console.log("client connected ");
    });
  }, []);

  return { socket };
};
