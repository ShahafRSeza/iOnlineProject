import React, { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { getUser, login } from "../../services/userService";
import { TokenContext } from "../../App";
import "./login.css";
import { FiChevronRight } from "react-icons/fi";
import { errorMsg, successMsg } from "../../services/feedbackService";
import { HiOutlineMail } from "react-icons/hi";
import { HiOutlineLockClosed } from "react-icons/hi2";
import { useState } from "react";

const Login = () => {
  const setToken = useContext(TokenContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().required().email(),
      password: yup.string().required().min(8),
    }),
    onSubmit: (values) => {
      login(values)
        .then((result) => {
          sessionStorage.setItem("token", result.data.token);
          setToken(result.data.token);
          getUser()
            .then((userInfo) => {
              localStorage.setItem("userName", userInfo.data.name);
              successMsg(`Welcome Back ${userInfo.data.name}!`);
            })
            .catch((err) => {
              errorMsg(`Oops. Something went wrong.. ${err}`);
            });
          navigate("/");
        })
        .catch((err) => {
          errorMsg(`Oops. Something went wrong..`);
        });
    },
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevIsPasswordVisible) => !prevIsPasswordVisible);
  };

  return (
    <>
      <div className="row">
        <div className="bannerToLogin col-lg-6 col-md-12">
          <div className="bannerLogin">
            <h2>Hi, Are you new here?</h2>
            <Link to={"/signup"}>
              <button className="smallBtn">
                <span>
                  Sign Up
                  <FiChevronRight className="icon" />
                </span>
              </button>
            </Link>
          </div>
        </div>

        <div className="col col-lg-6 my-2">
          <h1 className="signInTitle mb-4">
            <span className="productsTitle">Login</span> to your account
          </h1>
          <form onSubmit={formik.handleSubmit} className="px-3">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <div className="input">
                <HiOutlineMail className="inputIcon" />
                <input
                  type="email"
                  className="inputForm"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.email && formik.errors.email ? (
                <p className="text-danger">{formik.errors.email}</p>
              ) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input">
                <HiOutlineLockClosed className="inputIcon eye" />
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  className="inputForm"
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <span
                  className="tagglePassword"
                  onClick={togglePasswordVisibility}
                >
                  {isPasswordVisible ? "Hide Password" : "Show Password"}
                </span>
              </div>
              {formik.touched.password && formik.errors.password ? (
                <p className="text-danger">
                  {
                    " Password must contain: 1 Uppercase, 1 Lowercase, 4 Digits and 1 Special Character. "
                  }
                </p>
              ) : null}
            </div>

            <div className="d-flex gap-3 my-5">
              <button type="submit" className="signUpBtn w-75">
                Login
              </button>
              <div
                className="navBtn loginBtn w-25"
                onClick={(e) => formik.resetForm()}
              >
                clear
              </div>
            </div>
          </form>
          <div className="linkToLoginResponsive">
            <span> New here? </span>
            <Link to={"/signup"}>Sign Up</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
