import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { api, getParcelById } from "../../utils/Api";
import Loader from "../Shared/Loader";
import { stripePromise } from "../../utils/stripe";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      Swal.fire("Payment Failed", error.message, "error");
    } else if (paymentIntent.status === "succeeded") {
      Swal.fire(
        "Payment Successful 🎉",
        `Transaction ID: ${paymentIntent.id}`,
        "success"
      );
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      <button
        disabled={!stripe || loading}
        className="btn w-full bg-lime-500 text-white"
      >
        {loading ? <Loader /> : "Pay Now"}
      </button>
    </form>
  );
};

const Checkout = () => {
  const { id } = useParams();
  const [clientSecret, setClientSecret] = useState(null);

  // Get parcel
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["parcel", id],
    queryFn: () => getParcelById(id),
    enabled: !!id,
  });

  // Create PaymentIntent
  useEffect(() => {
    if (!data?.data) return;

    api
      .post("/create-payment-intent", {
        parcelId: data.data._id,
        customerName: data.data.senderName,
        customerEmail: data.data.senderEmail,
      })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      });
  }, [data]);

  if (isLoading || !clientSecret)
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-bars loading-xl text-lime-400"></span>
      </div>
    );
  if (isError) return <p className="text-red-500">{error.message}</p>;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">
        Pay ৳{data.data.cost}
      </h2>

      <Elements
        stripe={stripePromise}
        options={{
          clientSecret,
          defaultValues: {
            billingDetails: {
              name: data.data.senderName,
              email: data.data.senderEmail,
            },
          },
        }}
      >
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Checkout;
