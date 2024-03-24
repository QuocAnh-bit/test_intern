// import React from "react";
import "../sidebar/sidebar.scss";
import Logo from "../Logo";
import LogOut from "../LogOut";
export default function SideBar() {
  return (
    <div className="wrap-side-bar">
      <div className="side-bar">
        <Logo />
        <div>Posts</div>
        <LogOut />
      </div>
    </div>
  );
}
