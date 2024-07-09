"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import Peer from "peerjs";
import { useAppSelector } from "@/lib/store/hooks";
import { v4 as uuidv4 } from "uuid";

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>();
  const [me, setMe] = useState<Peer>();
  const [roomId, setRoomId] = useState<string>();
  const user = useAppSelector((state) => state.users.user);

  const createRoom = () => {
    const roomId = uuidv4();
    setRoomId(roomId);
  };

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SERVER_HOST as string, {
      withCredentials: true,
    });

    setSocket(socket);

    const peer = new Peer(user?._id!);
    setMe(peer);

    socket.on("connect", () => {
      console.log("client connected ");
    });
  }, []);

  return { socket, me, createRoom, roomId };
};
