import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/costants";

const Login = () => {
  const [emailID, setEmailID] = useState("");
  const [password, setPassword] = useState("");
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
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center my-20">
      <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-8">
        <legend className="fieldset-legend text-4xl">Login</legend>

        <label className="label text-xl">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={emailID}
          onChange={(e) => setEmailID(e.target.value)}
        />

        <label className="label text-xl mt-4">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-neutral mt-4 text-xl" onClick={handleLogin}>
          Login
        </button>
      </fieldset>
    </div>
  );
};

export default Login;
