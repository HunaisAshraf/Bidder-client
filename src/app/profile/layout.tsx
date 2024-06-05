import ProfileComponent from "@/components/ProfileComponent";
import React, { ReactNode } from "react";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-12 md:mx-36">
      <ProfileComponent />
      <div>{children}</div>
    </div>
  );
}
