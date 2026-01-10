import React, { useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../authentication/AuthContext";
import Swal from "sweetalert2";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import Loader from "../components/Shared/Loader";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import GoogleLogin from "../components/Shared/GoogleLogin";
import { api } from "../utils/Api";

const Register = () => {
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const [showEmailRules, setShowEmailRules] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);

  const { registerUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // optional validation
    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be under 2MB");
      return;
    }

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // ❌ cancel image
  const handleCancelImage = () => {
    setImageFile(null);
    setPreview(null);

    // reset file input
    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  const uploadImageToImgbb = async () => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMGBB_API_KEY
      }`,
      formData
    );

    return res.data.data.url;
  };

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
  const onSubmit = async (data) => {
    let photoURL = "";

    if (imageFile) {
      photoURL = await uploadImageToImgbb();
    }
    setLoading(true);
    registerUser(data.email, data.password, data.displayName, photoURL)
      .then(async (result) => {
        console.log(result);
        // 🧠 Save to DB
        await api.post("/users", {
          name: result.displayName,
          email: result.email,
          photoURL: result.photoURL,
        });
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
          setLoading(false);
          setPreview(null);
        });
      })
      .catch((error) => {
        console.log(error);
        let message = "Something went wrong";
        if (error.code === "auth/email-already-in-use") {
          message = "Email already in use!";
        }
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: message,
        });
        setLoading(false);
      });
  };

  return (
    <div className="card w-full shrink-0 max-w-md mx-auto mt-10">
      <div className="card-body p-6">
        <h1 className="text-4xl font-bold">Create an Account</h1>
        <p className="font-semibold mb-4">Register with ProFast</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Photo */}
          <div className="relative flex justify-start mb-6">
            <label className="cursor-pointer relative">
              {preview ? (
                <div className="flex gap-3">
                  <img
                    src={preview}
                    alt="preview"
                    className="w-24 h-24 rounded-full object-cover border-4 border-lime-400"
                  />
                  <button
                    type="button"
                    onClick={handleCancelImage}
                    className="text-red-500 underline cursor-pointer font-semibold text-lg"
                  >
                    Change image
                  </button>
                </div>
              ) : (
                <FaUserCircle className="text-5xl text-gray-400 hover:text-lime-500" />
              )}

              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                hidden
              />
            </label>
          </div>
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
            {loading ? <Loader /> : "Register"}
          </button>
        </form>

        <p className="text-lg mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-lime-500">
            Login
          </Link>
        </p>

        <div className="divider">OR</div>

        <GoogleLogin />
      </div>
    </div>
  );
};

export default Register;
