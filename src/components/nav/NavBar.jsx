// import React from "react";
import "../nav/navbar.scss";
import Logo from "../Logo";
import Button from "../Button";
import { useAuth } from "../AuthContext";
import LogOut from "../LogOut";

// eslint-disable-next-line react/prop-types
export default function NavBar({ hiddenBtn }) {
  const { isLogin } = useAuth();
  return (
    <header className="wrapper">
      <div className="header-wrap">
        <div className="nav-bar">
          <Logo />
          {hiddenBtn ? (
            ""
          ) : isLogin ? (
            <div className="group-btn">
              <Button btnText={"Profile"} link={`/profile`} />
              <LogOut />
            </div>
          ) : (
            <Button btnText={"Sign In"} link={"/sign-in"} />
          )}
        </div>
      </div>
    </header>
  );
}
