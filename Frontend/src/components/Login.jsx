import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/costants";

const Login = () => {
  const [emailID, setEmailID] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailID,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/feed");
    } catch (error) {
      setError(error?.response?.data);
      console.log(error);
    }
  };

  const handleSignin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailID, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (error) {
      setError(error?.response?.data);
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center my-20">
      <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-8">
        <legend className="fieldset-legend text-4xl">
          {isLoginForm ? "Login" : "Signin"}
        </legend>
        {!isLoginForm && (
          <div className="mb-2">
            <label className="label text-xl">First Name</label>
            <input
              type="text"
              className="input"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label className="label text-xl mt-4">Last Name</label>
            <input
              type="text"
              className="input"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        )}
        <label className="label text-xl">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={emailID}
          onChange={(e) => setEmailID(e.target.value)}
        />
        <label className="label text-xl mt-3">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-lg text-red-600 mt-2">{error}</p>}

        <button
          className="btn btn-neutral mt-3 text-xl"
          onClick={() => (isLoginForm ? handleLogin() : handleSignin())}
        >
          {isLoginForm ? "Login" : "Sign up"}
        </button>

        <p
          className="mt-5 text-lg text-center cursor-pointer"
          onClick={() => setIsLoginForm(!isLoginForm)} // ✅ toggle form
        >
          {isLoginForm ? "New User? Sign up here" : "Existing User? Login here"}
        </p>
      </fieldset>
    </div>
  );
};

export default Login;
