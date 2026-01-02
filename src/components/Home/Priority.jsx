import React from "react";
import image from "../../../src/assets/location-merchant.png";

const Priority = () => {
  return (
    <div className="flex p-20 bg-[#0b3b40] text-white rounded-xl mb-20">
      <div className="w-2/3">
        <h1 className="text-4xl font-bold">Merchant and Customer Satisfaction is Our First Priority</h1>
        <p className="my-5 w-4/5">
          We offer the lowest delivery charge with the highest value along with
          100% safety of your product. Pathao courier delivers your parcels in
          every corner of Bangladesh right on time.
        </p>
        <div>
          <button className="btn btn-dash border-lime-300 text-lime-300 hover:text-black p-5 hover:bg-lime-300 mr-2 shadow-none rounded-full text-lg">
            Become a Merchant
          </button>
          <button className="btn btn-dash border-lime-300 text-lime-300 hover:text-black p-5 hover:bg-lime-300 shadow-none rounded-full text-lg">
            Earn with Profast Courier
          </button>
        </div>
      </div>
      <div className="w-1/3">
        <img src={image} alt="" />
      </div>
    </div>
  );
};

export default Priority;
