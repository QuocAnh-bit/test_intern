// import React from 'react'
import logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";
export default function Logo() {
  return (
    <div>
      <Link to={`/`}>
        <img src={logo} alt="" />
      </Link>
    </div>
  );
}
