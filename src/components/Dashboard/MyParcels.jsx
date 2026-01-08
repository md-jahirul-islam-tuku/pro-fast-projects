import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../utils/Api";
import { useAuth } from "../../authentication/AuthContext";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaCcAmazonPay } from "react-icons/fa";

const MyParcels = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // 🔥 Fetch parcels with TanStack Query
  const {
    data: parcels = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myParcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await api.get(`/parcels/${user.email}`);
      return res.data.data;
    },
  });

  // 🗑 Delete handler
  const handleDelete = async (id, status) => {
    if (status === "delivered") return;

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This parcel will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#84cc16",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/parcels/${id}`);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Deleted!",
        text: "Parcel has been deleted.",
        showConfirmButton: false,
        timer: 1500,
      });

      // 🔁 Refetch parcels
      queryClient.invalidateQueries(["myParcels"]);
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Failed to delete parcel.", "error");
    }
  };

  // ⏳ Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-bars loading-xl text-lime-400"></span>
      </div>
    );
  }

  // ❌ Error state
  if (isError) {
    return <p className="text-red-500">Failed to load parcels</p>;
  }

  return (
    <div className="bg-white p-6 rounded shadow min-h-screen">
      <h2 className="text-2xl font-bold mb-4">My Parcels</h2>

      {parcels.length === 0 ? (
        <p className="text-red-500">No parcels found!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Status</th>
                <th>Cost</th>
                <th>Created</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {parcels.map((parcel) => (
                <tr key={parcel._id}>
                  <td>{parcel.title}</td>
                  <td>{parcel.parcelType}</td>
                  <td className="capitalize">{parcel.status}</td>
                  <td>৳{parcel.cost}</td>
                  <td>{new Date(parcel.createdAt).toLocaleDateString()}</td>
                  <td className="flex items-center">
                    <Link to={`payment/${parcel._id}`}>
                      <FaCcAmazonPay
                        className={`text-lg ${
                          parcel.status === "delivered"
                            ? "text-gray-300"
                            : "text-lime-500 text-xl"
                        }`}
                        title={
                          parcel.status === "delivered"
                            ? "Already delivered!"
                            : "Payment"
                        }
                      />
                    </Link>
                    <button
                      disabled={parcel.status === "delivered"}
                      onClick={() => handleDelete(parcel._id, parcel.status)}
                      className={`p-2 rounded-full ${
                        parcel.status === "delivered"
                          ? "cursor-not-allowed"
                          : "hover:bg-base-300 cursor-pointer"
                      }`}
                      title={
                        parcel.status === "delivered"
                          ? "Delivered parcels cannot be deleted"
                          : "Delete parcel"
                      }
                    >
                      <RiDeleteBin5Fill
                        className={`text-lg ${
                          parcel.status === "delivered"
                            ? "text-gray-300"
                            : "text-red-500"
                        }`}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyParcels;
