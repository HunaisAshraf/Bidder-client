"use client";

import React, { useEffect, useRef } from "react";
import { useSocket } from "@/utils/hooks/useSocket";
import { useAppSelector } from "@/lib/store/hooks";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useRouter } from "next/navigation";

export default function page({ params }: { params: { id: string } }) {
  const user = useAppSelector((state) => state.users.user);
  const { socket } = useSocket();
  const router = useRouter();

  const meetingContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (meetingContainerRef.current) {
      const appID = Number(process.env.NEXT_PUBLIC_ZEGO_APPID!);
      const serverSecret = "6ffd75820ef5a5e5851c6c0d01585a73";
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
