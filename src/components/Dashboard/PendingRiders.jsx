import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { api } from "../../utils/Api";

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
    <div className="p-6">
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
                <td>{new Date(rider.createdAt).toLocaleString()}</td>
                <td className="space-x-2">
                  <button
                    className="btn btn-xs btn-info"
                    onClick={() =>
                      Swal.fire(
                        "Rider Details",
                        `
                        Name: ${rider.name}
                        Email: ${rider.email}
                        Contact: ${rider.contact}
                        NID: ${rider.nid}
                        `,
                        "info"
                      )
                    }
                  >
                    Show
                  </button>

                  <button
                    className="btn btn-xs btn-success"
                    onClick={() => updateStatus(rider._id, "approved")}
                  >
                    Accept
                  </button>

                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => updateStatus(rider._id, "denied")}
                  >
                    Deny
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
