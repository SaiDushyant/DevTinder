import React, { useEffect } from "react";
import { BASE_URL } from "../utils/costants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import axios from "axios";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      console.log("API response:", res.data); // check what comes back
      dispatch(addFeed(res.data)); // ✅ dispatch the array directly
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!feed) {
      getFeed();
    }
  }, [feed]);

  if (!feed) {
    return <p className="text-center mt-10">Loading feed...</p>;
  }

  if (feed.length === 0) {
    return <p className="text-center mt-10">No User Found</p>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-6 mt-10">
      <UserCard key={feed[0]._id} user={feed[0]} />
    </div>
  );
};

export default Feed;
