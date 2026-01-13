import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../authentication/AuthContext";
import { getUserByEmail } from "../../utils/Api";
import Loader from "../Shared/Loader";

const formatDateTime = (date) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleString(); // date + time
};

const UserProfile = () => {
  const { user } = useAuth();

  const {
    data: dbUser,
  } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !!user?.email,
    queryFn: () => getUserByEmail(user.email),
  });

  return (
    <div className="max-w-md mx-auto bg-white shadow rounded-lg p-6">
      {/* User Image */}
      <div className="flex justify-center">
        <img
          src={dbUser?.photoURL || user?.photoURL}
          alt="User"
          className="w-24 h-24 rounded-full border border-lime-500"
        />
      </div>

      {/* User Info */}
      <div className="text-center mt-4 space-y-1">
        <h2 className="text-xl font-bold">{dbUser?.name}</h2>
        <p className="text-gray-600">{dbUser?.email}</p>

        <span className="inline-block px-3 py-1 text-sm rounded-full bg-lime-100 text-lime-700 mt-2 font-bold capitalize">
          {dbUser?.role}
        </span>
      </div>

      {/* Meta Info */}
      <div className="mt-6 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="font-bold">Created At</span>
          <span>{formatDateTime(dbUser?.createdAt)}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-bold">Last Login</span>
          <span>{formatDateTime(dbUser?.lastLoginAt)}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-bold">Role Updated</span>
          <span>{formatDateTime(dbUser?.roleUpdatedAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;