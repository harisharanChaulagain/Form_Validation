import React, { useState } from "react";
import { useFormik } from "formik";
import { signUpSchema } from "../schemas/index";
import axios from "axios";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const EditForm = () => {
  const [showPassword, setShowPassword] = useState();
  const [showConfirmPassword, setShowConfirmPassword] = useState();
  const [editUserData, setEditUserData] = useState({});
  const params = useParams();
  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
  };

  const {
    values,
    errors,
    touched,
    setFieldValue,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: signUpSchema,
    onSubmit: (values, action) => {
      console.log(values);
      axios
        .put(`http://localhost:8000/users/${params.userId}`, values)
        .then((response) => {
          console.log(response);
          window.location.href = "/userdetails";
        })
        .catch((error) => {
          console.warn(error);
        });
    },
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8000/users/${params.userId}`)
      .then((response) => {
        const edituserData = response.data;
        setEditUserData(edituserData);
        setFieldValue("firstname", edituserData.firstname);
        setFieldValue("lastname", edituserData.lastname);
        setFieldValue("email", edituserData.email);
        setFieldValue("password", edituserData.password);
        setFieldValue("confirmpassword", edituserData.confirmpassword);
      })
      .catch((error) => {
        console.warn("Error:", error);
      });
  }, [params.userId, setFieldValue]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div
          className="bg-white mx-auto my-14 shadow-2xl rounded"
          style={{ width: "400px" }}
        >
          <div className="flex flex-col ml-7 ">
            <h1 className="mt-10 font-bold text-2xl">Update Details</h1>
            <p className="mb-5 text-slate-400">Please update the details!</p>
          </div>
          <hr />
          <div className="flex flex-col">
            <div className="flex flex-row justify-between">
              <div className="my-4">
                <div className="flex flex-col relative">
                  <input
                    type="text"
                    className="bg-slate-300 rounded ml-6 p-2"
                    style={{ width: "170px", height: "40px" }}
                    autoComplete="off"
                    id="firstname"
                    name="firstname"
                    value={values.firstname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>

                {errors.firstname && touched.firstname ? (
                  <p className="text-red-500 text-sm mt-1 ml-6">
                    {errors.firstname}
                  </p>
                ) : null}
              </div>
              <div className="my-4">
                <input
                  type="text"
                  className="bg-slate-300 rounded mr-6 p-2"
                  style={{ width: "170px", height: "40px" }}
                  autoComplete="off"
                  id="lastname"
                  name="lastname"
                  value={values.lastname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.lastname && touched.lastname ? (
                  <p className="text-red-500 text-sm mt-1 ml-6">
                    {errors.lastname}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="my-4">
              <input
                type="email"
                className="bg-slate-300 rounded ml-6 p-2"
                style={{ width: "350px", height: "40px" }}
                autoComplete="off"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email ? (
                <p className="text-red-500 text-sm mt-1 ml-6">{errors.email}</p>
              ) : null}
            </div>
            <div className="my-4">
              <div className="flex flex-row relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="bg-slate-300 rounded ml-6 p-2"
                  style={{ width: "350px", height: "40px" }}
                  autoComplete="off"
                  id="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <span
                  className="absolute top-0 right-2 mt-3 mr-6 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              {errors.password && touched.password ? (
                <p className="text-red-500 text-sm mt-1 ml-6">
                  {errors.password}
                </p>
              ) : null}
            </div>
            <div className="my-4">
              <div className="flex flex-row relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="bg-slate-300 rounded ml-6 p-2"
                  style={{ width: "350px", height: "40px" }}
                  autoComplete="off"
                  id="confirmpassword"
                  name="confirmpassword"
                  value={values.confirmpassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <span
                  className="absolute top-0 right-2 mt-3 mr-6 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              {errors.confirmpassword && touched.confirmpassword ? (
                <p className="text-red-500 text-sm mt-1 ml-6">
                  {errors.confirmpassword}
                </p>
              ) : null}
            </div>
          </div>
          <button
            className=" font-bold text-white bg-blue-500 p-2 rounded ml-6 mt-3 mb-5 hover:bg-blue-600"
            style={{ width: "140px" }}
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
