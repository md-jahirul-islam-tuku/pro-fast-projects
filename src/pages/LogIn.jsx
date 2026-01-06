import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../authentication/AuthContext";
import Swal from "sweetalert2";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";

const LogIn = () => {
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const [showEmailRules, setShowEmailRules] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);

  const { signInUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // The page the user wanted to visit before login
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  const emailValue = useWatch({ control, name: "email", defaultValue: "" });
  const password = useWatch({ control, name: "password", defaultValue: "" });

  // Email validation checks
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

  // Form submit
  const onSubmit = (data) => {
    signInUser(data.email, data.password)
      .then(() => {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Log in successful ✅",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate(from, { replace: true });
        });
      })
      .catch((error) => {
        let message = "Login failed";
        if (error.code === "auth/user-not-found") {
          message = "This email is not registered. Please register first.";
        } else if (error.code === "auth/wrong-password") {
          message = "Incorrect password. Please try again.";
        } else if (error.code === "auth/invalid-credential") {
          message = "Invalid email or password.";
        }

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: message,
        });
      });
  };

  return (
    <div className="card w-full shrink-0">
      <div className="card-body">
        <h1 className="text-4xl font-bold">Welcome Back</h1>
        <p className="font-semibold">Login with ProFast</p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="fieldset text-lg font-semibold"
        >
          {/* Email */}
          <label className="label">Email</label>
          <input
            type="email"
            className="input w-full"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
            onFocus={() => setShowEmailRules(true)}
            onBlur={(e) => {
              if (!e.relatedTarget || e.relatedTarget.type !== "submit") {
                setShowEmailRules(false);
              }
            }}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
          {/* Show email rules only when focused or invalid */}
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
          <div>
            <a className="link link-hover underline">Forgot password?</a>
          </div>
          <button
            type="submit"
            className="btn bg-lime-400 hover:bg-lime-500 hover:text-white mt-4 text-xl"
          >
            Login
          </button>
        </form>

        <p className="text-lg mt-4">
          Don't have any account?{" "}
          <Link to="/register" className="text-lime-500">
            Register
          </Link>
        </p>

        <div className="divider">OR</div>

        <button className="btn bg-white text-black border-[#e5e5e5]">
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
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default LogIn;
