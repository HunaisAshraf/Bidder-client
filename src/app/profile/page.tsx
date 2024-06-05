"use client";

import ProfilePictureModal from "@/components/ProfilePictureModal";
import { useAppSelector } from "@/lib/store/hooks";

export default function Profile() {
  const user = useAppSelector((state) => state.users.user);
  return (
    <div className="p-5">
      
      {/* <div className="flex items-center gap-3">
        <img
          src={user?.profilePicture}
          alt={user?.name}
          className="rounded-full"
        />
        <p className="text-2xl font-semibold">{user?.name}</p>
      </div>
      <div>
        <ul>
            <li>asdf</li>
            <li>asdf</li>
            <li>asfd</li>
        </ul>
      </div> */}
    </div>
  );
}
