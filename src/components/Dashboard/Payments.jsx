import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../authentication/AuthContext";
import { api, getUserByEmail } from "../../utils/Api";

const Payments = () => {
  const { user } = useAuth();
  const { data: dbUser } = useQuery({
    queryKey: ["user", "rider", user?.email],
    enabled: !!user?.email,
    queryFn: () => getUserByEmail(user.email),
  });
  const role = dbUser?.role;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["payments", user?.email, role],
    queryFn: async () => {
      const res = await api.get("/payments", {
        params: {
          role,
          email: role !== "admin" ? user?.email : undefined,
        },
      });
      return res.data.data;
    },
    enabled: !!user,
  });

  if (isLoading)
    return (
      <div className="text-center mt-20">
        <span className="loading loading-bars loading-xl text-lime-400"></span>
      </div>
    );

  if (isError) return <p>Error loading payments</p>;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">
        {role === "admin" ? "All Payments" : "My Payments"}
      </h2>

      {data.length === 0 ? (
        <p className="text-red-500">No payments found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Amount</th>
                <th>Transaction</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((payment, index) => (
                <tr key={payment._id}>
                  <td>{index + 1}</td>
                  <td>{payment.customerEmail}</td>
                  <td>৳{payment.amount}</td>
                  <td className="text-xs">{payment.transactionId}</td>
                  <td
                    className={`font-bold ${
                      payment.status === "succeeded"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {payment.status}
                  </td>
                  <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Payments;
