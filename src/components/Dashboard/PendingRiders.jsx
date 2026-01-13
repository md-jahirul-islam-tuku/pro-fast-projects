import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { api } from "../../utils/Api";
import { FaEye } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import { RiDeleteBin5Line } from "react-icons/ri";

const PendingRiders = () => {
  const {
    data: riders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["pendingRiders"],
    queryFn: async () => {
      const res = await api.get("/riders/pending");
      return res.data.data;
    },
  });

  const updateStatus = (id, status) => {
    Swal.fire({
      title: `Are you sure?`,
      text: `This rider will be ${status}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#84cc16",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await api.patch(`/riders/${id}`, { status });
        Swal.fire("Updated!", `Rider ${status}`, "success");
        refetch();
      }
    });
  };

  const viewRider = (rider) => {
    Swal.fire({
      title: "Rider Details",
      html: `
          <div style="text-align:left">
            <p><b>Name:</b> ${rider.name}</p>
            <p><b>Email:</b> ${rider.email}</p>
            <p><b>Contact:</b> ${rider.contact}</p>
            <p><b>Region:</b> ${rider.region}</p>
            <p><b>Warehouse:</b> ${rider.warehouse}</p>
            <p><b>NID:</b> ${rider.nid}</p>
            <p><b>Approved At:</b> ${new Date(
              rider.createdAt
            ).toLocaleString()}</p>
          </div>
        `,
      icon: "info",
    });
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-bars loading-xl text-lime-400"></span>
      </div>
    );

  if (!riders.length) {
    return (
      <p className="text-center text-gray-500">No pending rider applications</p>
    );
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Pending Riders</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Region</th>
              <th>Warehouse</th>
              <th>Applied At</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {riders
              .filter((rider) => rider.status !== "approved")
              .map((rider, index) => (
                <tr key={rider._id}>
                  <td>{index + 1}</td>
                  <td>{rider.name}</td>
                  <td>{rider.email}</td>
                  <td>{rider.region}</td>
                  <td>{rider.warehouse}</td>
                  <td>{new Date(rider.createdAt).toLocaleDateString()}</td>

                  <td
                    className={`capitalize font-bold ${
                      rider.status === "pending"
                        ? "text-yellow-500"
                        : rider.status === "denied"
                        ? "text-red-500"
                        : "text-gray-500"
                    }`}
                  >
                    {rider.status}
                  </td>

                  <td className="flex flex-col lg:flex-row gap-1">
                    {/* View */}
                    <button
                      className="btn btn-xs btn-info"
                      title="View"
                      onClick={() => viewRider(rider)}
                    >
                      <FaEye />
                    </button>

                    {/* Approve */}
                    <button
                      className="btn btn-xs btn-success"
                      disabled={rider.status === "approved"}
                      onClick={() => updateStatus(rider._id, "approved")}
                    >
                      <SiTicktick />
                    </button>

                    {/* Deny */}
                    <button
                      className="btn btn-xs btn-error"
                      disabled={rider.status === "denied"}
                      onClick={() => updateStatus(rider._id, "denied")}
                    >
                      <RiDeleteBin5Line />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingRiders;
