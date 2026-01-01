import React from "react";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
        <h1 className="text-9xl font-extrabold text-red-500 mb-6">404</h1>
        <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="mb-8 text-center max-w-md">
          Oops! The page you are looking for does not exist. It might have been
          removed or the URL is incorrect.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Go Home
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;
