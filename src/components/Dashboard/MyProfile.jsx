import React from "react";
import { useAuth } from "../../authentication/AuthContext";

const MyProfile = () => {
  const { user } = useAuth();
  return (
    <div>
      <h1>
        <span className="text-lg font-semibold">User name:</span>{" "}
        {user?.displayName}
      </h1>
      <h1>
        <span className="text-lg font-semibold">User email:</span> {user?.email}
      </h1>
    </div>
  );
};

export default MyProfile;
