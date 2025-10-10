import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, gender, about, age, image } = user;
  return (
    <div className="card bg-base-300 w-96 shadow-2xl ">
      <figure className="mt-5">
        <img src={image} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName}</h2>
        <p>{about}</p>
        {gender && age && <p>{age + ", " + gender}</p>}
        <div className="card-actions justify-center m-4">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-primary">Interest</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
