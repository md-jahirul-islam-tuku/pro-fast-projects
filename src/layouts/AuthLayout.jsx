import React from "react";
import { Outlet } from "react-router-dom";
import image from "../assets/authImage.png";
import Logo from "../components/Shared/Logo";

const AuthLayout = () => {
  return (
    <div className="webWidth">
      <div className="">
        <div className="flex items-center flex-col-reverse lg:flex-row-reverse">
          <div className="flex-1 py-20 lg:pt-52 bg-lime-50 lg:min-h-screen">
            <img className="h-full" src={image} alt="" />
          </div>
          <div className="flex-1 bg-base-100 lg:min-h-screen lg:p-10 p-5">
            <Logo />
            <div className="flex items-center p-16 lg:p-18">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
