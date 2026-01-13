import { useForm } from "react-hook-form";
import riderImg from "../../src/assets/agent-pending.png"; // update path if needed
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { api, getUserByEmail } from "../utils/Api";
import Swal from "sweetalert2";
import Loader from "../components/Shared/Loader";
import { useAuth } from "../authentication/AuthContext";
import { useQuery } from "@tanstack/react-query";

const BeARider = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const { data: dbUser } = useQuery({
    queryKey: ["user", "rider", user?.email],
    enabled: !!user?.email,
    queryFn: () => getUserByEmail(user.email),
  });
  const role = dbUser?.role;

  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm();

  const onSubmit = async (data) => {
    setSubmitting(true);

    try {
      await api.post("/riders", data);
      Swal.fire({
        icon: "success",
        title: "Application Submitted",
        text: "Your rider application is under review",
        confirmButtonText: "OK",
        confirmButtonColor: "#84cc16",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/"); // 🔁 redirect AFTER OK
        }
      });
    } catch (error) {
      setSubmitting(false); // ❌ stop loader if failed

      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error.response?.data?.message || error.message,
      });
    }
  };

  return (
    <div className="webWidth py-12">
      <div className="bg-white rounded-2xl p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* LEFT SIDE */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Be a Rider</h1>
          <p className="text-gray-600 max-w-xl">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>

          <hr className="my-8" />

          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Tell us about yourself
          </h2>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name & Age */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div>
                <label className="label font-bold">Your Name</label>
                <input
                  {...register("name", { required: "Name is required" })}
                  className="input input-bordered w-full"
                  defaultValue={user?.displayName}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="label font-bold">Your Age</label>
                <input
                  type="number"
                  {...register("age", {
                    required: "Age is required",
                    min: { value: 18, message: "Must be at least 18" },
                  })}
                  placeholder="Your age"
                  className="input input-bordered w-full"
                />
                {errors.age && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.age.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email & Region */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div>
                <label className="label font-bold">Your Email</label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="input input-bordered w-full"
                  defaultValue={user?.email}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="label font-bold">Your Region</label>
                <select
                  {...register("region", { required: "Region is required" })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select your region</option>
                  <option>Dhaka</option>
                  <option>Chattogram</option>
                  <option>Rajshahi</option>
                  <option>Khulna</option>
                </select>
                {errors.region && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.region.message}
                  </p>
                )}
              </div>
            </div>

            {/* NID & Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div>
                <label className="label font-bold">NID No</label>
                <input
                  {...register("nid", {
                    required: "NID is required",
                    minLength: {
                      value: 8,
                      message: "Invalid NID number",
                    },
                  })}
                  placeholder="NID"
                  className="input input-bordered w-full"
                />
                {errors.nid && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.nid.message}
                  </p>
                )}
              </div>

              <div>
                <label className="label font-bold">Contact</label>
                <input
                  {...register("contact", {
                    required: "Contact is required",
                  })}
                  placeholder="Contact"
                  className="input input-bordered w-full"
                />
                {errors.contact && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.contact.message}
                  </p>
                )}
              </div>
            </div>

            {/* Warehouse */}
            <div>
              <label className="label font-bold">
                Which wire-house you want to work?
              </label>
              <select
                {...register("warehouse", {
                  required: "Warehouse is required",
                })}
                className="select select-bordered w-full"
              >
                <option value="">Select wire-house</option>
                <option>Uttara Hub</option>
                <option>Mirpur Hub</option>
                <option>Chattogram Hub</option>
              </select>
              {errors.warehouse && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.warehouse.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting || role === "rider"}
              className="btn w-full btn-primary text-black font-semibold"
            >
              {submitting ? <Loader /> : "Submit"}
            </button>
          </form>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hidden lg:flex justify-center">
          <img
            src={riderImg}
            alt="Rider"
            className="max-h-105 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default BeARider;
