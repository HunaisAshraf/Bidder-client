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
      await axiosInstance.get("/api/auth/logout");
    } catch (error) {
      console.log(error);
    }
  }

  // async function verifyToken(token: string) {
  //   try {
  //     console.log(token);

  //     let { data } = await axiosInstance.get("/api/auth/verify-token", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   const user = localStorage.getItem("auth");
  //   const token = localStorage.getItem("token");

  //   console.log(token);
  //   console.log(user);

  //   if (token) {
  //     verifyToken(token);
  //   }

  //   if (user) {
  //     dispatch(setUser(JSON.parse(user)));
  //     router.push("/");
  //   } else {
  //     // dispatch(logout());
  //     // handleLogout();
  //   }
  // }, []);

  const saveAuthData = (data: any) => {
    localStorage.setItem("auth", JSON.stringify(data));
    dispatch(setUser(data));
    // router.push("/");
  };
  return { saveAuthData };
};

// export default useAuth;
