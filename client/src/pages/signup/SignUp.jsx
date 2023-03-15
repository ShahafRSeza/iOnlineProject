import "./signUp.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../../services/userService";
import { errorMsg, successMsg } from "../../services/feedbackService";
import { AiOutlineIdcard } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { HiOutlineLockClosed } from "react-icons/hi2";

const SignUp = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Please insert Full Name").min(2),
      email: yup.string().required("Please insert Valid Email").email(),
      password: yup
        .string()
        .required(
          "Password Must be Minimum 8 Characters, 1 Uppercase letter, 1 Lowercase letter and special character"
        )
        .min(8)
        .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d{4})(?=.*[^A-Za-z0-9]).{8,}$/),
    }),
    onSubmit: (values) => {
      let user = { ...values, isAdmin: false };
      addUser(user)
        .then((result) => {
          localStorage.setItem("userName", user.name);
          sessionStorage.setItem("token", result.data.token);
          successMsg(`Welcome ${user.name}!`);
          navigate("/");
        })
        .catch((err) => {
          errorMsg(`Oops. Something went wrong.. ${err}`);
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
        <div className="col col-lg-6 my-2">
          <h1 className="signInTitle mb-4">
            <span className="productsTitle">Sign Up</span> for faster checkout
          </h1>
          <form onSubmit={formik.handleSubmit} className="px-3">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>

              <div className="input">
                <AiOutlineIdcard className="inputIcon" />
                <input
                  className="inputForm"
                  type="text"
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              {formik.touched.name && formik.errors.name ? (
                <p className="text-danger">{formik.errors.name}</p>
              ) : null}
            </div>
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
            <div className="mb-5">
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
            <div className="d-flex gap-3">
              <button type="submit" className="signUpBtn w-75">
                Sign Up
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
            <span> Already have an account? </span>
            <Link to={"/login"}>Login</Link>
          </div>
        </div>
        <div className="bannerToLogin col-lg-6 col-md-12">
          <div className="bannerLogin">
            <h2>Already have an account?</h2>
            <Link to={"/login"}>
              <button className="smallBtn">
                <span>
                  Login Now
                  <FiChevronRight className="icon" />
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
