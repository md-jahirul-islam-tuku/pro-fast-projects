import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { calculateCost } from "../utils/calculateCost";

const regions = ["Dhaka", "Barishal", "Chattogram", "Rajshahi", "Khulna"];
const serviceCenters = ["Uttara", "Mirpur", "Dhanmondi", "Agrabad"];

const AddParcel = ({ user }) => {
  const [parcelType, setParcelType] = useState("document");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      senderName: user?.name || "",
    },
  });

  const onSubmit = (data) => {
    const cost = calculateCost({
      type: parcelType,
      weight: data.weight,
      senderCenter: data.senderCenter,
      receiverCenter: data.receiverCenter,
    });

    toast.info(
      <div>
        <p className="font-semibold">Delivery Cost: ৳{cost}</p>
        <button
          onClick={() => confirmBooking(data, cost)}
          className="mt-2 bg-lime-500 text-white px-4 py-1 rounded"
        >
          Confirm
        </button>
      </div>,
      { autoClose: false }
    );
  };

  const confirmBooking = async (data, cost) => {
    console.log(data, cost);
    // try {
    //   await axios.post("/api/parcels", {
    //     ...data,
    //     type: parcelType,
    //     cost,
    //     creation_date: new Date(),
    //   });

    //   toast.dismiss();
    //   toast.success("Parcel booked successfully!");
    // } catch (err) {
    //   console.log(err);
    //   toast.error("Failed to save parcel");
    // }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow my-5">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-10">Add Parcel</h2>
      <p className="text-gray-500 text-xl font-semibold mb-3">
        Enter your parcel details
      </p>
      <hr className="my-4 border-gray-300" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Parcel Info */}
        <section>
          <div className="flex gap-6 mb-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={parcelType === "document"}
                onChange={() => setParcelType("document")}
              />
              Document
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={parcelType === "non-document"}
                onChange={() => setParcelType("non-document")}
              />
              Non-Document
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-semibold">Parcel Name</label>
              <input
                {...register("title", { required: true })}
                className="input w-full"
                placeholder="Parcel Name"
              />
            </div>

            {parcelType === "non-document" && (
              <div>
                <label className="block mb-1 font-semibold">
                  Parcel Weight (KG)
                </label>
                <input
                  type="number"
                  {...register("weight")}
                  className="input w-full"
                  placeholder="Parcel Weight (KG)"
                />
              </div>
            )}
          </div>
        </section>

        {/* Sender & Receiver Info side by side */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sender Info */}
          <div>
            <h3 className="font-semibold text-xl mb-4">Sender Details :</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block mb-1 font-semibold">Sender Name</label>
                <input
                  {...register("senderName", { required: true })}
                  className="input w-full"
                  placeholder="Sender Name"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold">Address</label>
                <input
                  {...register("senderContact", { required: true })}
                  className="input w-full"
                  placeholder="Address"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold">
                  Sender Phone Number
                </label>
                <input
                  {...register("phoneNumber", { required: true })}
                  className="input w-full"
                  placeholder="Phone Number"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold">
                  Sender District
                </label>
                <select
                  {...register("senderRegion", { required: true })}
                  className="input w-full"
                >
                  <option value="">Select District</option>
                  {regions.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 font-semibold">
                  Service Center
                </label>
                <select
                  {...register("senderCenter", { required: true })}
                  className="input w-full"
                >
                  <option value="">Select Service Center</option>
                  {serviceCenters.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 font-semibold">
                  Pickup Instruction
                </label>
                <textarea
                  {...register("pickupInstruction", { required: true })}
                  className="input w-full"
                  placeholder="Pickup Instruction"
                />
              </div>
            </div>
          </div>

          {/* Receiver Info */}
          <div>
            <h3 className="font-semibold text-xl mb-4">Receiver Details :</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block mb-1 font-semibold">
                  Receiver Name
                </label>
                <input
                  {...register("receiverName", { required: true })}
                  className="input w-full"
                  placeholder="Receiver Name"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold">Address</label>
                <input
                  {...register("receiverContact", { required: true })}
                  className="input w-full"
                  placeholder="Address"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold">
                  Receiver Phone Number
                </label>
                <input
                  {...register("receiverAddress", { required: true })}
                  className="input w-full"
                  placeholder="Phone Number"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold">
                  Receiver District
                </label>
                <select
                  {...register("receiverRegion", { required: true })}
                  className="input w-full"
                >
                  <option value="">Select Region</option>
                  {regions.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 font-semibold">
                  Service Center
                </label>
                <select
                  {...register("receiverCenter", { required: true })}
                  className="input w-full"
                >
                  <option value="">Select Service Center</option>
                  {serviceCenters.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 font-semibold">
                  Delivery Instruction
                </label>
                <textarea
                  {...register("deliveryInstruction", { required: true })}
                  className="input w-full"
                  placeholder="Delivery Instruction"
                />
              </div>
            </div>
          </div>
        </section>

        <button className="bg-lime-500 text-white font-semibold px-6 py-2 rounded hover:bg-lime-600 transition">
          Proceed to Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default AddParcel;
