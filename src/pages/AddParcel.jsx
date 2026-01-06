import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { calculateCost } from "../utils/calculateCost";
import { api } from "../utils/Api";
import { useAuth } from "../authentication/AuthContext";

const MySwal = withReactContent(Swal);

const regions = ["Dhaka", "Barishal", "Chattogram", "Rajshahi", "Khulna"];
const serviceCenters = ["Uttara", "Mirpur", "Dhanmondi", "Agrabad"];

const AddParcel = () => {
  const [parcelType, setParcelType] = useState("document");
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      senderName: user?.displayName || "",
      senderEmail: user?.email || "",
    },
  });

  // Show confirmation modal before booking
  const onSubmit = (data) => {
    const cost = calculateCost({
      type: parcelType,
      weight: data.weight,
      senderCenter: data.senderCenter,
      receiverCenter: data.receiverCenter,
    });

    MySwal.fire({
      title: "Confirm Parcel Booking",
      html: (
        <div className="text-left space-y-2">
          <h3 className="font-semibold">Parcel Info:</h3>
          <p>Type: {parcelType}</p>
          <p>Title: {data.title}</p>
          {parcelType === "non-document" && <p>Weight: {data.weight} KG</p>}
          <p>Cost: ৳{cost}</p>

          <h3 className="font-semibold mt-3">Sender Details:</h3>
          <p>Name: {data.senderName}</p>
          <p>Address: {data.senderContact}</p>
          <p>Phone: {data.phoneNumber}</p>
          <p>Email: {user?.email}</p>
          <p>District: {data.senderRegion}</p>
          <p>Service Center: {data.senderCenter}</p>
          <p>Pickup Instruction: {data.pickupInstruction}</p>

          <h3 className="font-semibold mt-3">Receiver Details:</h3>
          <p>Name: {data.receiverName}</p>
          <p>Address: {data.receiverContact}</p>
          <p>Phone: {data.receiverAddress}</p>
          <p>District: {data.receiverRegion}</p>
          <p>Service Center: {data.receiverCenter}</p>
          <p>Delivery Instruction: {data.deliveryInstruction}</p>
        </div>
      ),
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      width: 600,
      customClass: {
        htmlContainer: "text-left",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        confirmBooking(data, cost);
      }
    });
  };

  // Send data to backend
  const confirmBooking = async (data, cost) => {
    try {
      await api.post("/parcels", {
        ...data,
        parcelType,
        cost,
        status: "pending",
        createdAt: new Date(),
      });

      MySwal.fire({
        icon: "success",
        title: "Parcel booked successfully ✅",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to save parcel ❌",
        text: err.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow my-5">
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
              {errors.title && (
                <span className="text-red-500">Parcel Name is required</span>
              )}
            </div>

            {parcelType === "non-document" && (
              <div>
                <label className="block mb-1 font-semibold">
                  Parcel Weight (KG)
                </label>
                <input
                  type="number"
                  {...register("weight", { required: true })}
                  className="input w-full"
                  placeholder="Parcel Weight (KG)"
                />
                {errors.weight && (
                  <span className="text-red-500">Weight is required</span>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Sender & Receiver Info */}
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
                <label className="block mb-1 font-semibold">Phone Number</label>
                <input
                  {...register("phoneNumber", { required: true })}
                  className="input w-full"
                  placeholder="Phone Number"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">District</label>
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
                <label className="block mb-1 font-semibold">Phone Number</label>
                <input
                  {...register("receiverAddress", { required: true })}
                  className="input w-full"
                  placeholder="Phone Number"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">District</label>
                <select
                  {...register("receiverRegion", { required: true })}
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

        <button
          type="submit"
          className="bg-lime-500 text-black cursor-pointer hover:text-white font-semibold px-6 py-2 rounded hover:bg-lime-600 transition"
        >
          Proceed to Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default AddParcel;
