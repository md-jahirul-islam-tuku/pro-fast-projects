import React from "react";
import serviceIcon from "../../../src/assets/service.png";

const Services = () => {
  const services = [
    {
      title: "Express & Standard Delivery",
      desc: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
      highlight: false,
    },
    {
      title: "Nationwide Delivery",
      desc: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
      highlight: false,
    },
    {
      title: "Fulfillment Solution",
      desc: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
      highlight: false,
    },
    {
      title: "Cash on Home Delivery",
      desc: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
      highlight: false,
    },
    {
      title: "Corporate Service / Contract In Logistics",
      desc: "Customized corporate services which includes warehouse and inventory management support.",
      highlight: false,
    },
    {
      title: "Parcel Return",
      desc: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
      highlight: false,
    },
  ];
  return (
    <section className="bg-[#0b3b40] py-16 px-4 rounded-xl mb-5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center text-white mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Our Services</h2>
          <p className="text-sm md:text-base opacity-80 max-w-2xl mx-auto">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="rounded-2xl p-6 text-center transition hover:shadow-xl bg-base-100 hover:bg-lime-300 cursor-pointer"
            >
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-18 h-18 rounded-full bg-linear-to-b from-violet-100 to-transparent flex items-center justify-center">
                  <span className="">
                    <img src={serviceIcon} alt="" />
                  </span>
                </div>
              </div>

              {/* Content */}
              <h3 className="font-semibold text-lg mb-2 text-[#0b3b40]">{service.title}</h3>
              <p className="text-sm opacity-80 leading-relaxed">
                {service.desc}
              </p>

              {/* Optional Router Link */}
              {/* <Link
                to="/services"
                className="btn btn-sm btn-outline mt-4"
              >
                Learn More
              </Link> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
