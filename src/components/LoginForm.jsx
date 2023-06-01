import React from "react";
import { useFormik } from "formik";
import { signUpSchema } from "../schemas/index";
import axios from "axios";
import { Link } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values, action) => {
        console.log(values);
      },
    });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div
          className="bg-white mx-auto my-14 shadow-2xl rounded"
          style={{ width: "400px" }}
        >
          <div className="flex flex-col ml-7 ">
            <h1 className="mt-10 font-bold text-2xl">Log In</h1>
            <p className="mb-5 text-slate-400">Please login to your account!</p>
          </div>
          <hr />
          <div className="flex flex-col">
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
              <input
                type="password"
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
              {errors.password && touched.password ? (
                <p className="text-red-500 text-sm mt-1 ml-6">
                  {errors.password}
                </p>
              ) : null}
            </div>
            <div className="flex flex-row">
              <button
                className=" font-bold text-white bg-blue-500 p-2 rounded ml-6 mt-3 mb-5 hover:bg-blue-600"
                style={{ width: "140px" }}
                type="submit"
              >
                Log In
              </button>
              <Link
                to="/"
                className="p-2 ml-6 mt-3 mb-5 cursor-pointer text-slate-500 hover:text-slate-700"
              >
                Create New Account?
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
