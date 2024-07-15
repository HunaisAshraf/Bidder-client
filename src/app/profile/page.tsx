"use client";

import ProfilePictureModal from "@/components/EditProfileComponent";
import { useAppSelector } from "@/lib/store/hooks";

export default function Profile() {
  const user = useAppSelector((state) => state.users.user);
  return <div className="p-5">Profile</div>;
}
