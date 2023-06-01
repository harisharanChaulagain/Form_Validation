import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";

const UserDetails = () => {
  const [userData, setUserData] = useState([]);

  const handleDeleteUser = (userId) => {
    axios
      .delete(`http://localhost:8000/users/${userId}`)
      .then((response) => {
        console.log(response);
        const updatedUserData = userData.filter((user) => user.id !== userId);
        setUserData(updatedUserData);
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/users")
      .then((response) => {
        const usersData = response.data;
        setUserData(usersData);
      })
      .catch((error) => {
        console.warn("Error:", error);
      });
  }, []);

  return (
    <div className="bg-white mx-auto mt-16 rounded shadow-2xl" style={{ width: "650px" }}>
      <h1 className="font-bold text-2xl">List of Users</h1>
      <hr className="my-4" />
      <table className="w-full">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.id}>
              <td className="p-2">{user.firstname}</td>
              <td className="p-2">{user.lastname}</td>
              <td className="p-2">{user.email}</td>
              <td className="flex flex-row gap-3 text-2xl">
                <MdDelete
                  className="text-red-500 cursor-pointer hover:text-red-600 hover:scale-105"
                  onClick={() => handleDeleteUser(user.id)}
                />
                <BiEdit className="text-orange-500 cursor-pointer hover:text-orange-600 hover:scale-105" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDetails;
