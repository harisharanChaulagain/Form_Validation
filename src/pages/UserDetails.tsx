import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import {
  useGetAllUserQuery,
  useDeleteUserMutation,
} from "../lib/features/userSlice";

const UserDetails = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: userData, isError, isLoading } = useGetAllUserQuery({});
  const [deleteUser] = useDeleteUserMutation();

  if (isLoading) {
    return <p>Loading....</p>;
  }

  if (isError) {
    return <p>Something went wrong</p>;
  }

  const handleDelete = async (id: any) => {
    try {
      await deleteUser(id);
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const handleEditUser = (userId: any) => {
    window.location.href = `/edit-user/${userId}`;
  };

  // filter data
  const filteredData = userData?.filter((user: any) =>
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
          {tableData?.map((user: any) => (
            <tr key={user.id}>
              <td className="p-2">{user.firstname}</td>
              <td className="p-2">{user.lastname}</td>
              <td className="p-2">{user.email}</td>
              <td className="flex flex-row gap-3 text-2xl">
                <MdDelete
                  className="text-red-500 cursor-pointer hover:text-red-600 hover:scale-105"
                  onClick={() => handleDelete(user.id)}
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
    </div>
  );
};

export default UserDetails;
