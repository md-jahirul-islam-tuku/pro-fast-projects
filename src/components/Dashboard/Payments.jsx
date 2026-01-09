import { useQuery } from "@tanstack/react-query";
import { api } from "../../utils/Api";
import Loader from "../Shared/Loader";
import { useAuth } from "../../authentication/AuthContext";

const Payments = () => {
  const { user } = useAuth(); // from AuthContext

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await api.get(`/payments/${user.email}`);
      console.log(res);
      return res.data || [];
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-bars loading-xl text-lime-400"></span>
      </div>
    );
  if (isError) return <p className="text-red-500">{error.message}</p>;

  if (!data?.length) {
    return <p className="text-center text-gray-500">No payments found</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Payments</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Parcel</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Transaction</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {data.map((payment, index) => (
              <tr key={payment._id}>
                <td>{index + 1}</td>
                <td>{payment.parcelTitle}</td>
                <td>${payment.amount}</td>
                <td>
                  <span className="badge bg-lime-500 capitalize">
                    {payment.status}
                  </span>
                </td>
                <td className="text-xs">{payment.transactionId}</td>
                <td>{new Date(payment.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;
