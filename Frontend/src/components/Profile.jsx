import React from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.user);

  if (!user) {
    // show fallback while data loads or before login
    return <p className="text-center mt-10 text-lg">Loading profile...</p>;
  }

  return (
    <div>
      <EditProfile user={user} />
    </div>
  );
};

export default Profile;
