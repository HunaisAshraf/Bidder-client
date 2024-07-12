"use client";

import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import { useSocket } from "@/utils/hooks/useSocket";
import { useAppSelector } from "@/lib/store/hooks";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useRouter } from "next/navigation";

export default function page({ params }: { params: { id: string } }) {
  const user = useAppSelector((state) => state.users.user);
  const { socket } = useSocket();
  const router = useRouter();

  // const myMeeting = (element: any) => {
  //   const appID = 286654821;
  //   const serverSecret = process.env.NEXT_PUBLIC_SERVER_SECRET!;
  //   const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
  //     appID,
  //     serverSecret,
  //     params.id,
  //     user?._id!,
  //     user?.name
  //   );

  //   const zc = ZegoUIKitPrebuilt.create(kitToken);
  //   zc?.joinRoom({
  //     container: element,
  //     scenario: {
  //       mode: ZegoUIKitPrebuilt.OneONoneCall,
  //     },
  //     showScreenSharingButton: false,
  //     turnOnCameraWhenJoining: true,
  //   });
  // };

  // useEffect(() => {
  //   // console.log("aaaaaaaaaaa");
  //   // socket?.on("call_declined", () => {
  //   //   console.log(
  //   //     "deccccccclllllllllllliiiiiiiiiiinnnnnnnnnnnnnnneeeeeeeeeeeee"
  //   //   );
  //   //   router.push("/chat");
  //   // });

  //   return () => {
  //     navigator.mediaDevices
  //       .getUserMedia({ video: true, audio: true })
  //       .then((stream) => {
  //         const tracks = stream.getTracks();
  //         tracks.forEach((track) => track.stop());
  //         tracks.forEach((track) => (track.enabled = false));
  //       });
  //   };
  // }, []);
  const meetingContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (meetingContainerRef.current) {
      const appID = 286654821;
      const serverSecret = process.env.NEXT_PUBLIC_SERVER_SECRET!;
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        params.id,
        user?._id!,
        user?.name
      );

      const zc = ZegoUIKitPrebuilt.create(kitToken);
      zc?.joinRoom({
        container: meetingContainerRef.current,
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        showScreenSharingButton: false,
        turnOnCameraWhenJoining: true,
      });
    }

    // Cleanup function to stop all media tracks on component unmount
    return () => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          const tracks = stream.getTracks();
          tracks.forEach((track) => track.stop());
          tracks.forEach((track) => (track.enabled = false));
        });
    };
  }, [params.id, user]);

  return (
    <div>
      <div
        ref={meetingContainerRef}
        className="min-h-[90vh] max-w-screen"
      ></div>
    </div>
  );
}
