import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/costants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
    } catch (error) {
      console.error(res.json());
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);
  if (!connections) return;
  if (connections.length === 0) return <h1>No Connnection found</h1>;

  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="text-3xl text-center font-bold my-10">Connections</h1>
      <ul className="list bg-base-300 rounded-box shadow-md max-w-10/12 mb-10 ">
        {connections.map((connection) => {
          const { firstName, lastName, gender, age, image, about } = connection;
          return (
            <li key={connection._id} className="list-row">
              <div>
                <img className="size-16 rounded-full" src={image} />
              </div>
              <div>
                <div className="text-xl">{firstName + " " + lastName}</div>
                {age && gender && (
                  <div className="text-xs uppercase font-semibold opacity-60">
                    {age + ", " + gender}
                  </div>
                )}
              </div>
              <p className="list-col-wrap text-md">{about}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Connections;
