import React from "react";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import Logo from "./Logo";

const Navbar = () => {
  const Links = (
    <>
      <li>
        <NavLink to={"/services"}>Services</NavLink>
      </li>
      <li>
        <NavLink to={"/coverage"}>Coverage</NavLink>
      </li>
      <li>
        <NavLink to={"/about"}>About Us</NavLink>
      </li>
      <li>
        <NavLink to={"/pricing"}>Pricing</NavLink>
      </li>
      <li>
        <NavLink to={"/be-rider"}>Be a Rider</NavLink>
      </li>
    </>
  );
  return (
    <div className="pt-5">
      <div className="navbar bg-white  rounded-xl">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {Links}
            </ul>
          </div>
          <div>
            <Logo />
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-lg font-semibold">
            {Links}
          </ul>
        </div>
        <div className="navbar-end">
          <Link to={"/login"} className="btn hover:bg-lime-400 border-none mr-1">
            Sign In
          </Link>
          <a className="btn hover:bg-lime-400 border-none">Be a rider</a>
          <BsArrowUpRightCircleFill className="text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
