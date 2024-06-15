"use client";

import { useAppSelector } from "@/lib/store/hooks";

export default function Details() {
  const user = useAppSelector(state=>state.users.user)

  return <div>
    <div className="my-4">
      <label className="text-gray-500 block mb-2 ">Name</label>
      <input type="text" disabled className="p-2 border-2 rounded" value={user?.name} />
    </div>
    <div className="my-4">
    <label className="text-gray-500 block mb-2 ">Email</label>
      <input type="text" disabled className="p-2 border-2 rounded" value={user?.email} />
    </div>
    <div className="my-4 ">
    <label className="text-gray-500 block mb-2 ">Phone</label>
      <input type="text" disabled className="p-2 border-2 rounded" placeholder="---" value={user?.phone} />
    </div>
  </div>;
}
