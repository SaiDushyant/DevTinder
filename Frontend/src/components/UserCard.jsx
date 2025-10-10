import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, gender, about, age, image } = user;
  return (
    <div className="card bg-base-300 w-96 shadow-2xl ">
      <figure className="">
        <img src={image} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>{" "}
        {gender && age && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center m-4">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-primary">Interest</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
