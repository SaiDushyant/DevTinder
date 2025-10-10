import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/costants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [age, setAge] = useState(user.age || "");
  const [image, setImage] = useState(user.image || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispute = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, image, gender, about },
        { withCredentials: true }
      );
      dispute(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center my-10 gap-10 h-fit">
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile updated successfully !!</span>
          </div>
        </div>
      )}
      <div className="flex justify-center">
        <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-8">
          <legend className="fieldset-legend text-4xl">Edit Profile</legend>
          <label className="label text-xl">First Name</label>
          <input
            type="text"
            className="input"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label className="label text-xl">Last Name</label>
          <input
            type="text"
            className="input"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <label className="label text-xl">Age</label>
          <input
            type="text"
            className="input"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <label className="label text-xl">Photo URL</label>
          <input
            type="text"
            className="input"
            placeholder="Photo URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <label className="label text-xl">Gender</label>
          <input
            type="text"
            className="input"
            placeholder="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
          <label className="label text-xl">About</label>
          <input
            type="text"
            className="input"
            placeholder="About"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
          {error && <p className="text-lg text-red-600 mt-2">{error}</p>}
          <button
            className="btn btn-neutral mt-3 text-xl"
            onClick={saveProfile}
          >
            Save
          </button>
        </fieldset>
      </div>
      <UserCard
        key={user._id}
        user={{ firstName, lastName, age, image, gender, about }}
      />
    </div>
  );
};

export default EditProfile;
