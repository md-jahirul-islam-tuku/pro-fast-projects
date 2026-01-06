import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../authentication/AuthContext";
import Swal from "sweetalert2";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";

const Register = () => {
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const [showEmailRules, setShowEmailRules] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);

  const { registerUser, user } = useAuth();
  console.log(user);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  const emailValue = useWatch({ control, name: "email", defaultValue: "" });
  const password = useWatch({ control, name: "password", defaultValue: "" });

  // Email validation
  const emailChecks = {
    hasTextBeforeAt: /^[^\s@]+/.test(emailValue),
    hasAt: /@/.test(emailValue),
    hasDomain: /\.[^\s@]+$/.test(emailValue),
  };
  const isEmailValid =
    emailChecks.hasTextBeforeAt && emailChecks.hasAt && emailChecks.hasDomain;

  // Password rules
  const rules = {
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[@$!%*?&#]/.test(password),
    length: password.length >= 8,
  };
  const isPasswordValid = Object.values(rules).every(Boolean);

  // Submit
  const onSubmit = (data) => {
    registerUser(data.email, data.password, data.displayName)
      .then(() => {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Registration successful ✅",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          reset();
          setPasswordShow(false);
          setShowEmailRules(false);
          setShowPasswordRules(false);
        });
      })
      .catch((error) => {
        let message = "Something went wrong";
        if (error.code === "auth/email-already-in-use") {
          message = "Email already in use!";
        }
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: message,
        });
      });
  };

  return (
    <div className="card w-full shrink-0 max-w-md mx-auto mt-10 shadow-lg">
      <div className="card-body p-6">
        <h1 className="text-4xl font-bold">Create an Account</h1>
        <p className="font-semibold mb-4">Register with ProFast</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="label">Name</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Full Name"
              {...register("displayName", { required: "Name is required" })}
            />
            {errors.displayName && (
              <span className="text-red-500">{errors.displayName.message}</span>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              className="input w-full"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              })}
              onFocus={() => {
                if (!isEmailValid) setShowEmailRules(true);
              }}
              onBlur={(e) => {
                if (!e.relatedTarget || e.relatedTarget.type !== "submit") {
                  setShowEmailRules(false);
                }
              }}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
            {showEmailRules && !isEmailValid && (
              <ul className="mt-2 space-y-1 text-sm">
                <li
                  className={
                    emailChecks.hasTextBeforeAt
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  ✔ Characters before @
                </li>
                <li
                  className={
                    emailChecks.hasAt ? "text-green-500" : "text-red-500"
                  }
                >
                  ✔ Contains @ symbol
                </li>
                <li
                  className={
                    emailChecks.hasDomain ? "text-green-500" : "text-red-500"
                  }
                >
                  ✔ Valid domain (.com, .net, etc.)
                </li>
              </ul>
            )}
          </div>

          {/* Password */}
          <label className="label">Password</label>
          <div className="relative">
            <input
              type={passwordShow ? "text" : "password"}
              className="input w-full"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              onFocus={() => setShowPasswordRules(true)}
              onBlur={(e) => {
                // Only hide rules if the new focus is NOT the eye icon
                if (
                  !e.relatedTarget ||
                  !e.relatedTarget.classList.contains("toggle-password")
                ) {
                  setShowPasswordRules(false);
                }
              }}
            />
            <button
              type="button"
              onClick={() => setPasswordShow(!passwordShow)}
              className="absolute top-3 right-3 text-lg cursor-pointer z-10 toggle-password"
            >
              {passwordShow ? <PiEyeClosedBold /> : <PiEyeBold />}
            </button>
          </div>
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}

          {/* Password validation rules */}
          {showPasswordRules && !isPasswordValid && (
            <ul className="mt-2 space-y-1 text-sm">
              <li
                className={rules.uppercase ? "text-green-500" : "text-red-500"}
              >
                ✔ Uppercase letter
              </li>
              <li
                className={rules.lowercase ? "text-green-500" : "text-red-500"}
              >
                ✔ Lowercase letter
              </li>
              <li className={rules.number ? "text-green-500" : "text-red-500"}>
                ✔ Number
              </li>
              <li className={rules.special ? "text-green-500" : "text-red-500"}>
                ✔ Special character
              </li>
              <li className={rules.length ? "text-green-500" : "text-red-500"}>
                ✔ At least 8 characters
              </li>
            </ul>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={!isEmailValid || !isPasswordValid}
            className="btn bg-lime-400 hover:bg-lime-500 hover:text-white mt-4 w-full text-xl"
          >
            Register
          </button>
        </form>

        <p className="text-lg mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-lime-500">
            Login
          </Link>
        </p>

        <div className="divider">OR</div>

        <button className="btn bg-white text-black border-[#e5e5e5] w-full flex items-center justify-center space-x-2">
          {/* Google Icon */}
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Register with Google
        </button>
      </div>
    </div>
  );
};

export default Register;
