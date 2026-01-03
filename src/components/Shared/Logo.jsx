import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={"/"} className="flex items-baseline-last">
      <img src={logo} alt="" />
      <h1 className="text-3xl -ml-4 font-bold">ProFast</h1>
    </Link>
  );
};

export default Logo;
