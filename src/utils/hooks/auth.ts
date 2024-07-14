import { setUser, logout } from "@/lib/store/features/userSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { axiosInstance } from "../constants";
import { headers } from "next/headers";

export const useAuth = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  async function handleLogout() {
    try {
      await axiosInstance.get("/api/v1/auth/logout");
    } catch (error) {
      console.log(error);
    }
  }

  const saveAuthData = (data: any) => {
    localStorage.setItem("auth", JSON.stringify(data));
    dispatch(setUser(data));
  };
  return { saveAuthData };
};
