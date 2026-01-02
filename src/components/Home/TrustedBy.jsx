import React from "react";
import { Link } from "react-router-dom";
import amazonIcon from "../../../src/assets/brands/amazon.png";
import casioIcon from "../../../src/assets/brands/casio.png";
import moonstarIcon from "../../../src/assets/brands/moonstar.png";
import startIcon from "../../../src/assets/brands/start.png";
import startPeopleIcon from "../../../src/assets/brands/start-people 1.png";
import randstadIcon from "../../../src/assets/brands/randstad.png";

const brands = [
  { name: "Casio", logo: `${casioIcon}` },
  { name: "Amazon", logo: `${amazonIcon}` },
  { name: "Moonstar", logo: `${moonstarIcon}` },
  { name: "Star+", logo: `${startIcon}` },
  { name: "Start People", logo: `${startPeopleIcon}` },
  { name: "Randstad", logo: `${randstadIcon}` },
];

const TrustedBy = () => {
  return (
    <section className="py-14 px-4 mb-5 rounded-xl">
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <h3 className="text-lg font-bold text-[#0b3b40] mb-8">
          We've helped thousands of sales teams
        </h3>

        {/* Logos */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mb-10">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="text-gray-500 font-semibold text-lg tracking-wide hover:text-[#0b3b40] transition"
            >
              <img src={brand.logo} alt="" />
            </div>
          ))}
        </div>
        <hr className="border-gray-300 border-2"/>
      </div>
    </section>
  );
};

export default TrustedBy;
