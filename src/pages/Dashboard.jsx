import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../authentication/AuthContext";
import {
  FaBoxOpen,
  FaMoneyCheckAlt,
  FaSearchLocation,
  FaUser,
  FaCog,
} from "react-icons/fa";

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <div className="lg:hidden flex items-center justify-start bg-gray-300">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="">Navbar Title</div>
        </div>
        {/* Page content via Outlet */}
        <div className="py-6 pl-6 flex-1">
          <Outlet />
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 min-h-full w-56 p-4 rounded-l-xl text-lg font-semibold">
          <li>
            <NavLink
              to="parcels"
              className={({ isActive }) =>
                `flex items-center gap-3 ${
                  isActive ? "bg-lime-400 text-white" : ""
                }`
              }
            >
              <FaBoxOpen className="text-xl" />
              Parcels
            </NavLink>
          </li>

          <li>
            <NavLink
              to={`payments/${user?.email}`}
              className={({ isActive }) =>
                `flex items-center gap-3 ${
                  isActive ? "bg-lime-400 text-white" : ""
                }`
              }
            >
              <FaMoneyCheckAlt className="text-xl" />
              Payments
            </NavLink>
          </li>

          <li>
            <NavLink
              to="trackPackage"
              className={({ isActive }) =>
                `flex items-center gap-3 ${
                  isActive ? "bg-lime-400 text-white" : ""
                }`
              }
            >
              <FaSearchLocation className="text-xl" />
              Track Package
            </NavLink>
          </li>

          <li>
            <NavLink
              to="profile"
              className={({ isActive }) =>
                `flex items-center gap-3 ${
                  isActive ? "bg-lime-400 text-white" : ""
                }`
              }
            >
              <FaUser className="text-xl" />
              Profile
            </NavLink>
          </li>

          <li>
            <NavLink
              to="settings"
              className={({ isActive }) =>
                `flex items-center gap-3 ${
                  isActive ? "bg-lime-400 text-white" : ""
                }`
              }
            >
              <FaCog className="text-xl" />
              Settings
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
