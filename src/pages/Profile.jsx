// import React from "react";
import SideBar from "../components/sidebar/SideBar";
import Posts from "../components/posts/Posts";
import { useAuth } from "../components/AuthContext";
import { getCookie } from "../utils/cookie";

export default function Profile() {
  const { isLogin } = useAuth();
  const token = getCookie("accessToken");
  if (!token && !isLogin) {
    window.location.href = "http://localhost:5173/sign-in";
  }
  return (
    <div className="row">
      <SideBar />
      <Posts />
    </div>
  );
}
