import React, { useEffect, useState } from "react";
import { api } from "../../utils/Api";
import { useAuth } from "../../authentication/AuthContext";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Swal from "sweetalert2";

const MyParcels = () => {
  const { user } = useAuth();
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchParcels = async () => {
      try {
        const res = await api.get(`/parcels/${user.email}`);
        setParcels(res.data.data);
      } catch (error) {
        console.error("Failed to fetch parcels", error);
      } finally {
        setLoading(false);
      }
    };

    fetchParcels();
  }, [user]);

  if (loading) {
    return (
      <div className="text-center mt-20 min-h-screen">
        <span className="loading loading-bars loading-xl text-lime-400"></span>
      </div>
    );
  }

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This parcel will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#84cc16", // lime
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/parcels/${id}`);

      Swal.fire("Deleted!", "Parcel has been deleted.", "success");

      // 🔥 Remove deleted parcel from UI instantly
      setParcels((prev) => prev.filter((parcel) => parcel._id !== id));
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Failed to delete parcel.", "error");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">My Parcels</h2>

      {parcels.length === 0 ? (
        <p className="text-gray-500">No parcels found</p>
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
                  <td>
                    <button
                      onClick={() => handleDelete(parcel._id)}
                      className="cursor-pointer hover:bg-base-300 p-2 rounded-full"
                      title={`${
                        parcel.status === "delivered"
                          ? "Not allowed"
                          : "Delete Parcel"
                      }`}
                      disabled={parcel.status === "delivered"}
                    >
                      <RiDeleteBin5Fill
                        className={`text-lg ${
                          parcel.status === "delivered"
                            ? "text-gray-300 cursor-not-allowed"
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
