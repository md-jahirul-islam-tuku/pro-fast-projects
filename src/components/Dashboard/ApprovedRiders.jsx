import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { api } from "../../utils/Api";
import Loader from "../Shared/Loader";
import { FaEye } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

const ApprovedRiders = () => {
  const {
    data: riders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["approved-riders"],
    queryFn: async () => {
      const res = await api.get("/riders?status=approved");
      return res.data.data;
    },
  });

  const denyRider = (id) => {
    Swal.fire({
      title: "Deny this rider?",
      text: "This rider will lose approval",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, Deny",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await api.patch(`/riders/${id}`, { status: "denied" });
        Swal.fire("Denied!", "Rider has been denied", "success");
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
            rider.reviewedAt
          ).toLocaleString()}</p>
        </div>
      `,
      icon: "info",
    });
  };

  if (isLoading) return <Loader />;

  if (!riders.length) {
    return (
      <p className="text-center text-gray-500">No approved riders found</p>
    );
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Approved Riders</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Region</th>
              <th>Warehouse</th>
              <th>Approved At</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {riders.map((rider, index) => (
              <tr key={rider._id}>
                <td>{index + 1}</td>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.region}</td>
                <td>{rider.warehouse}</td>
                <td>{new Date(rider.createdAt).toLocaleDateString()}</td>
                <td className="flex flex-col lg:flex-row gap-1">
                  <button
                    className="btn btn-xs btn-info"
                    onClick={() => viewRider(rider)}
                  >
                    <FaEye />
                  </button>

                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => denyRider(rider._id)}
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

export default ApprovedRiders;
