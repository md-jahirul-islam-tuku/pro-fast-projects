import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const LogIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const onSubmit = (data) => {
    console.log(data);
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
          <label className="label">Email</label>
          <input
            type="email"
            className="input w-full"
            placeholder="Email"
            {...register("email", {
              required: "Email is required !",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address !",
              },
            })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
          <label className="label">Password</label>
          <input
            type="password"
            className="input w-full"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              maxLength: {
                value: 20,
                message: "Maximum 20 characters",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                message:
                  "Must include uppercase, lowercase, number & special character",
              },
            })}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
          <div>
            <a className="link link-hover underline">Forgot password?</a>
          </div>
          <button className="btn bg-lime-400 hover:bg-lime-500 hover:text-white mt-4 text-xl">
            Login
          </button>
        </form>
        <p className="text-lg">
          Don't have any account?{" "}
          <Link to={"/register"} className="text-lime-500">
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
