import React from "react";

const ConfirmBox = () => {
  return (
    <div>
      <h1>Are You Sure ?</h1>
      <p>You won't be able to revert this!</p>
      <div>
        <button className="font-bold text-white bg-blue-500 p-2 rounded ml-6 mt-3 hover:bg-blue-600"
         style={{ width: "140px" }}
        >Yes, delete it</button>
        <button
        className="font-bold text-white bg-red-500 hover:bg-red-600 rounded p-2 mt-3"
        style={{ width: "140px" }}
        >Cancel</button>
      </div>
    </div>
  );
};

export default ConfirmBox;
