import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api, getParcelById } from "../../utils/Api";
import Loader from "../Shared/Loader";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["parcel", id],
    queryFn: () => getParcelById(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="text-center mt-20 min-h-screen">
        <span className="loading loading-bars loading-xl text-lime-400"></span>
      </div>
    );
  }

  if (isError) {
    return <p className="text-red-500">{error.message}</p>;
  }

  if (!data?.data) {
    return <p className="text-red-500">Parcel not found</p>;
  }

  const parcel = data.data;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      // 1️⃣ Create payment intent
      const res = await api.post("/create-payment-intent", {
        amount: parcel.cost,
        parcelId: parcel._id,
      });

      const clientSecret = res.data.clientSecret;

      // 2️⃣ Confirm card payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        Swal.fire({
          icon: "error",
          title: "Payment Failed",
          text: result.error.message,
        });
        return;
      }

      // 3️⃣ Success
      if (result.paymentIntent.status === "succeeded") {
        Swal.fire({
          icon: "success",
          title: "Payment Successful 🎉",
          text: `Transaction ID: ${result.paymentIntent.id}`,
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Pay ৳{parcel.cost}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <CardElement className="p-4 border rounded" />

        <button
          type="submit"
          disabled={!stripe || loading}
          className="btn w-full bg-lime-500 hover:bg-lime-600 text-white"
        >
          {loading ? <Loader /> : `Pay ৳${parcel.cost}`}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
