import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/costants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.request);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (error) {
      console.error(error.json);
    }
  };

  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data));
    } catch (error) {}
  };

  useEffect(() => {
    fetchRequest();
  }, []);
  if (!requests) return;
  if (requests.length === 0)
    return (
      <h1 className="flex justify-center mt-10 text-2xl">No Requests found</h1>
    );
  console.log(requests);

  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="text-3xl text-center font-bold my-10">
        Connection Requests
      </h1>
      <ul className="bg-base-300 rounded-box shadow-md w-8/12 mb-10">
        {requests.map((request) => {
          const { firstName, lastName, gender, age, image, about } =
            request.fromUserId;

          return (
            <li
              key={request._id}
              className="flex items-center justify-between p-4 border-b border-base-200"
            >
              {/* Left section (profile info) */}
              <div className="flex items-center gap-6">
                <img
                  className="size-16 rounded-full object-cover"
                  src={image}
                  alt={firstName}
                />
                <div>
                  <div className="text-xl font-semibold">
                    {firstName + " " + lastName}
                  </div>
                  {age && gender && (
                    <div className="text-xs uppercase font-semibold opacity-60">
                      {age + ", " + gender}
                    </div>
                  )}
                  <p className="text-md text-gray-500">{about}</p>
                </div>
              </div>

              {/* Right section (buttons) */}
              <div className="flex gap-3">
                <button
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition"
                  onClick={reviewRequest("rejected", request._id)}
                >
                  Accept
                </button>
                <button
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition"
                  onClick={reviewRequest("accepted", request._id)}
                >
                  Decline
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Requests;
