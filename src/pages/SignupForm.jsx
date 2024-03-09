import React, { useState } from "react";
import { useFormik } from "formik";
import { signUpSchema } from "../schemas/index";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";

const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  confirmpassword: "",
};

const SignupForm = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState();
  const [showConfirmPassword, setShowConfirmPassword] = useState();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values, action) => {
        console.log(values);
        axios
          .post("http://localhost:8000/users", values)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.warn(error);
          });
        action.resetForm();
      },
    });
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div
          className="bg-white mx-auto my-14 shadow-2xl rounded"
          style={{ width: "400px" }}
        >
          <div className="flex flex-col ml-7 ">
            <h1 className="mt-10 font-bold text-2xl">Sign Up</h1>
            <p className="mb-5 text-slate-400">
              Please fill in this form to create an account!
            </p>
          </div>
          <hr />
          <div className="flex flex-col">
            <div className="flex flex-row justify-between">
              <div className="my-4">
                <input
                  type="text"
                  className="bg-slate-300 rounded ml-6 p-2"
                  style={{ width: "170px", height: "40px" }}
                  placeholder="First Name"
                  autoComplete="off"
                  id="firstname"
                  name="firstname"
                  value={values.firstname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
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
                  placeholder="Last Name"
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
                placeholder="Email"
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
                  placeholder="Password"
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
                  placeholder="Confirm Password"
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
          <div className="flex flex-row pl-6">
            <input
              type="checkbox"
              className="cursor-pointer"
              onChange={handleCheckboxChange}
            />
            <p className="text-slate-500 pl-2">
              {" "}
              I accept the
              <a href="/" className="text-blue-600">
                Terms of Use{" "}
              </a>
              &
              <a href="/" className="text-blue-600">
                {" "}
                Privacy Policy
              </a>
            </p>
          </div>
          <div className="flex flex-row">
            <button
              className=" font-bold text-white bg-blue-500 p-2 rounded ml-6 mt-3 mb-5 hover:bg-blue-600"
              style={{ width: "140px" }}
              type="submit"
              disabled={!isChecked}
            >
              Sign Up
            </button>

            <div
             
              className="p-2 ml-6 mt-3 mb-5 cursor-pointer text-slate-500 hover:text-slate-700"
            >
              Already have account?
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
