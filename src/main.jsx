import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./router/router.jsx";
import "swiper/css";
import "swiper/css/pagination";
import AuthProvider from "./authentication/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "./utils/stripe.js";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Elements stripe={stripePromise}>
          <RouterProvider router={router} />
        </Elements>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
