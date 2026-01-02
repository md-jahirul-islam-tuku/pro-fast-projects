import React from "react";
import icon1 from "../../../src/assets/live-tracking.png";
import icon2 from "../../../src/assets/safe-delivery.png";

const Guarantee = () => {
  const services = [
    {
      desc: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
      title: "Live Parcel Tracking",
      logo: `${icon1}`,
    },
    {
      desc: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
      title: "100% Safe Delivery",
      logo: `${icon2}`,
    },
    {
      desc: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
      title: "24/7 Call Center Support",
      logo: `${icon2}`,
    },
  ];
  return (
    <div>
      {services.map((service, index) => (
        <div
          key={index}
          className="text-gray-500 font-semibold text-lg tracking-wide hover:text-[#0b3b40] transition flex items-center py-10 px-20 bg-white mb-5 rounded-xl"
        >
          <img src={service.logo} alt="" />
          <hr className="h-50 border-l-3 border-gray-300 mx-10 border-dashed" />
          <div>
            <h2 className="text-2xl font-bold mb-3 text-[#0b3b40]">{service.title}</h2>
            <p>{service.desc}</p>
          </div>
        </div>
      ))}
      <hr className="border-gray-300 my-20 border-2"/>
    </div>
  );
};

export default Guarantee;
