import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { api } from "../../utils/Api";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch all users
  useEffect(() => {
    api.get("/users").then((res) => {
      setUsers(res.data.data);
      setLoading(false);
    });
  }, []);

  // Filter users
  const displayedUsers = search
    ? users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      )
    : users;

  const updateRole = async (newRole) => {
    const actionText = newRole === "admin" ? "Make Admin" : "Cancel Admin";

    Swal.fire({
      title: `${actionText}?`,
      text:
        newRole === "admin"
          ? "This user will become an admin"
          : "Admin access will be removed",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#84cc16",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await api.patch(`/users/role/${selectedUser.email}`, {
          role: newRole,
        });

        Swal.fire("Success", `Role updated to ${newRole}`, "success").then(
          (result) => result.isConfirmed && setSelectedUser(null)
        );

        // Update UI instantly
        setSelectedUser({ ...selectedUser, role: newRole });

        setUsers((prev) =>
          prev.map((u) =>
            u.email === selectedUser.email ? { ...u, role: newRole } : u
          )
        );
      }
    });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-bars loading-xl text-lime-400"></span>
      </div>
    );

  return (
    <div className="w-full mx-auto p-6 bg-white shadow rounded">
      {/* SEARCH + USER LIST */}
      {!selectedUser && (
        <>
          <input
            type="text"
            placeholder="Search user by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered border-lime-500 w-full mb-4"
          />

          <ul className="border border-lime-500 rounded bg-base-100 min-h-screen overflow-y-auto">
            {displayedUsers.map((user) => (
              <li
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className="flex justify-between items-center px-4 py-2 cursor-pointer hover:bg-lime-100"
              >
                <span className="font-bold">{user.name}</span>
                <span className="text-start">{user.email}</span>

                <span
                  className={`badge capitalize font-bold ${
                    user.role === "admin"
                      ? "bg-lime-500"
                      : `badge-outline ${
                          user.role === "user"
                            ? " border-lime-500 text-lime-600"
                            : "badge-info"
                        }`
                  }`}
                >
                  {user.role}
                </span>
              </li>
            ))}

            {displayedUsers.length === 0 && (
              <li className="text-center py-4 text-gray-500">No users found</li>
            )}
          </ul>
        </>
      )}

      {/* USER DETAILS */}
      {selectedUser && (
        <div className="text-center space-y-3">
          <img
            src={selectedUser.photoURL}
            alt=""
            className="w-20 h-20 rounded-full mx-auto"
          />

          <h2 className="text-xl font-bold">{selectedUser.name}</h2>
          <p className="text-gray-500">{selectedUser.email}</p>

          <span
            className={`badge capitalize ${
              selectedUser.role === "admin"
                ? "bg-lime-500"
                : `badge-outline ${
                    selectedUser.role === "user"
                      ? " border-lime-500 text-lime-600"
                      : "badge-info"
                  }`
            }`}
          >
            <span className="font-bold">Role:</span> {selectedUser.role}
          </span>

          {selectedUser.role !== "admin" && (
            <button
              onClick={() => updateRole("admin")}
              className="btn bg-lime-500 text-white w-full"
            >
              Make Admin
            </button>
          )}

          {selectedUser.role === "admin" && (
            <button
              onClick={() => updateRole("user")}
              className="btn btn-error w-full"
            >
              Cancel Admin
            </button>
          )}

          <button
            onClick={() => setSelectedUser(null)}
            className="btn btn-outline w-full"
          >
            Back to Search
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
