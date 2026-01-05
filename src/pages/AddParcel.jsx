import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { calculateCost } from "../utils/calculateCost";

const regions = ["Dhaka", "Chattogram", "Rajshahi", "Khulna"];
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
    try {
      await axios.post("/api/parcels", {
        ...data,
        type: parcelType,
        cost,
        creation_date: new Date(),
      });

      toast.dismiss();
      toast.success("Parcel booked successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to save parcel");
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow my-5">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-10">Add Parcel</h2>
      <hr className="my-4 border-gray-300" />
      <p className="text-gray-500 text-xl font-semibold mb-3">
        Enter your parcel details
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Parcel Info */}
        <section>
          <div className="flex gap-6 mb-4">
            <label>
              <input
                type="radio"
                checked={parcelType === "document"}
                onChange={() => setParcelType("document")}
              />{" "}
              Document
            </label>
            <label>
              <input
                type="radio"
                checked={parcelType === "non-document"}
                onChange={() => setParcelType("non-document")}
              />{" "}
              Non-Document
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              {...register("title", { required: true })}
              placeholder="Parcel Name"
              className="input"
            />

            {parcelType === "non-document" && (
              <input
                type="number"
                {...register("weight")}
                placeholder="Weight (KG)"
                className="input"
              />
            )}
          </div>
        </section>

        {/* Sender Info */}
        <section>
          <h3 className="font-semibold mb-4">Sender Info</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              {...register("senderName", { required: true })}
              className="input"
            />
            <input
              {...register("senderContact", { required: true })}
              className="input"
            />

            <select
              {...register("senderRegion", { required: true })}
              className="input"
            >
              <option value="">Select Region</option>
              {regions.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>

            <select
              {...register("senderCenter", { required: true })}
              className="input"
            >
              <option value="">Select Service Center</option>
              {serviceCenters.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <textarea
              {...register("senderAddress", { required: true })}
              className="input col-span-2"
            />
            <textarea
              {...register("pickupInstruction", { required: true })}
              className="input col-span-2"
            />
          </div>
        </section>

        {/* Receiver Info */}
        <section>
          <h3 className="font-semibold mb-4">Receiver Info</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              {...register("receiverName", { required: true })}
              className="input"
            />
            <input
              {...register("receiverContact", { required: true })}
              className="input"
            />

            <select
              {...register("receiverRegion", { required: true })}
              className="input"
            >
              <option value="">Select Region</option>
              {regions.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>

            <select
              {...register("receiverCenter", { required: true })}
              className="input"
            >
              <option value="">Select Service Center</option>
              {serviceCenters.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <textarea
              {...register("receiverAddress", { required: true })}
              className="input col-span-2"
            />
            <textarea
              {...register("deliveryInstruction", { required: true })}
              className="input col-span-2"
            />
          </div>
        </section>

        <button className="bg-lime-500 text-white px-6 py-2 rounded">
          Proceed to Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default AddParcel;
