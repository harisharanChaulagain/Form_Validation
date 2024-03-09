import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="p-20 ">
      <h1 className="text-3xl py-5">Hello ! This is Home Page.</h1>
      <div className="space-x-10">
        <button className="text-xl text-white bg-blue-900 p-4 rounded-md">
          <Link to="/signup">Create User</Link>
        </button>
        <button className="text-xl text-white bg-blue-900 p-4 rounded-md">
          <Link to="userdetails">View Details</Link>
        </button>
      </div>
    </div>
  );
}
