import React from "react";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import { Link, NavLink, useMatch } from "react-router-dom";
import Logo from "./Logo";
import { useAuth } from "../../authentication/AuthContext";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const match = useMatch("/dashboard/*");
  const Links = (
    <>
      <li>
        <NavLink
          to={"/services"}
          className={({ isActive }) =>
            `${isActive ? "bg-lime-400 text-white" : ""}`
          }
        >
          Services
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/coverage"}
          className={({ isActive }) =>
            `${isActive ? "bg-lime-400 text-white" : ""}`
          }
        >
          Coverage
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/about"}
          className={({ isActive }) =>
            `${isActive ? "bg-lime-400 text-white" : ""}`
          }
        >
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/sendParcel"}
          className={({ isActive }) =>
            `${isActive ? "bg-lime-400 text-white" : ""}`
          }
        >
          Send Parcel
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/be-rider"}
          className={({ isActive }) =>
            `${isActive ? "bg-lime-400 text-white" : ""}`
          }
        >
          Be a Rider
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            to="/dashboard/parcels"
            className={match ? "bg-lime-400 text-white" : ""}
          >
            Dashboard
          </NavLink>
        </li>
      )}
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
          {user ? (
            <>
              <h1 className="text-xl mr-2 text-lime-600">{user.displayName}</h1>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      className="border-2 rounded-full border-lime-500"
                      alt="Tailwind CSS Navbar component"
                      src={user.photoURL}
                    />
                  </div>
                </div>
                <ul
                  tabIndex="-1"
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <Link
                      onClick={() => signOutUser()}
                      className="btn hover:bg-lime-400 border-none text-xl"
                    >
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <Link
                to={"/login"}
                className="btn hover:bg-lime-400 border-none mr-1"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="btn hover:bg-lime-400 border-none"
              >
                Register
              </Link>
            </>
          )}

          <BsArrowUpRightCircleFill className="text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
