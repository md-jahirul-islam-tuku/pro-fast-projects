import React from "react";
import Navbar from "../components/Shared/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Shared/Footer";

const RootLayout = () => {
  return (
    <div className="webWidth">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
