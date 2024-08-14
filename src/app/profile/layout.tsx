import ProfileComponent from "@/components/ProfileComponent";
import VerifiedRoute from "@/components/VerifiedRoute";
import React, { ReactNode } from "react";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-3 md:mx-36">
      <ProfileComponent />
      <VerifiedRoute>
        <div>{children}</div>
      </VerifiedRoute>
    </div>
  );
}
