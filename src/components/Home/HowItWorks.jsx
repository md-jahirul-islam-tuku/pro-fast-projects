import React from "react";
import BookingIcon from "../../../src/assets/bookingIcon.png"

const steps = [
  {
    title: "Booking Pick & Drop",
    desc: "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    title: "Cash On Delivery",
    desc: "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    title: "Delivery Hub",
    desc: "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    title: "Booking SME & Corporate",
    desc: "From personal packages to business shipments — we deliver on time, every time.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-base-200 py-16 px-4 mb-5 rounded-xl">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-2xl font-semibold text-[#0b3b40] mb-8">
          How it Works
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-base-100 rounded-2xl p-6 transition hover:shadow-lg"
            >
              {/* Icon */}
              <div className="mb-4 text-3xl text-[#0b3b40]"><img src={BookingIcon} alt="" /></div>

              {/* Content */}
              <h3 className="font-semibold text-sm mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {step.desc}
              </p>

              {/* Optional Router Link */}
              {/* 
              <Link
                to="/how-it-works"
                className="text-sm text-primary font-medium inline-block mt-3"
              >
                Learn more →
              </Link>
              */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
