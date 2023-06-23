import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";

const UserDetails = () => {
  const [userData, setUserData] = useState([]);
  const [editUserDetails, setEditUserDetails] = useState();
  const [selected, setSelected] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDeleteUser = (userId) => {
    axios
      .delete(`http://localhost:8000/users/${userId}`)
      .then((response) => {
        console.log(response);
        const updatedUserData = userData.filter((user) => user.id !== userId);
        setUserData(updatedUserData);
        setSelected(null);
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  const handleEditUser = (userId) => {
    setEditUserDetails(userId);
    window.location.href = `/edit-user/${userId}`;
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

  // delete confirm
  const handleDeleteView = (user) => {
    setSelected(user.id);
  };

  // cancel
  const handleDeleteCancle = () => {
    setSelected(null);
  };

  // filter data
  const filteredData = userData.filter((user) =>
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const tableData = searchQuery ? filteredData : userData;

  return (
    <div
      className="bg-white mx-auto mt-16 rounded shadow-2xl"
      style={{ width: "650px" }}
    >
      <div className="flex m-2 p-2 justify-between">
        <h1 className="font-bold text-2xl">List of Users</h1>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-slate-200 rounded-sm p-2"
          placeholder="Search here"
        />
      </div>
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
          {tableData.map((user) => (
            <tr key={user.id}>
              <td className="p-2">{user.firstname}</td>
              <td className="p-2">{user.lastname}</td>
              <td className="p-2">{user.email}</td>
              <td className="flex flex-row gap-3 text-2xl">
                <MdDelete
                  className="text-red-500 cursor-pointer hover:text-red-600 hover:scale-105"
                  // onClick={() => handleDeleteUser(user.id)}
                  onClick={() => handleDeleteView(user)}
                />
                <Link to={`/edit-user/${user.id}`}>
                  <BiEdit
                    className="text-orange-500 cursor-pointer hover:text-orange-600 hover:scale-105"
                    onClick={() => handleEditUser(user.id)}
                  />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selected && (
        <div
          className="bg-slate-200 inset-0"
          style={{ height: "150px", width: "400px" }}
        >
          <div>
            <h1 className="font-bold text-2xl">Are You Sure ?</h1>
            <p>You won't be able to revert this!</p>
          </div>
          <div>
            <button
              className="font-bold text-white bg-blue-500 p-2 rounded ml-6 mt-3 hover:bg-blue-600"
              style={{ width: "140px" }}
              onClick={() => handleDeleteUser(selected)}
            >
              Yes, delete it
            </button>
            <button
              className="font-bold text-white bg-red-500 hover:bg-red-600 rounded p-2 mt-3"
              style={{ width: "140px" }}
              onClick={handleDeleteCancle}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
