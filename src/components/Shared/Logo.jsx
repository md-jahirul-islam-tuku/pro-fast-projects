import React from "react";
import logo from "../../assets/logo.png";

const Logo = () => {
  return (
    <div className="flex items-baseline-last">
      <img src={logo} alt="" />
      <h1 className="text-3xl -ml-4 font-bold">ProFast</h1>
    </div>
  );
};

export default Logo;
