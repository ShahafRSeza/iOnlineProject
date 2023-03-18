import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { TokenContext, UserContext } from "../../App";
import { getProductsInCart } from "../../services/cartService";
import { FiChevronRight } from "react-icons/fi";
import { BsPersonLock } from "react-icons/bs";
import { RiShutDownLine } from "react-icons/ri";
import { FiShoppingBag } from "react-icons/fi";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./navbar.css";
import { errorMsg, successMsg } from "../../services/feedbackService";

function Navbar() {
  const setToken = useContext(TokenContext);
  const userDetails = useContext(UserContext);
  const storedUserDetails = localStorage.getItem("userName");
  const isLogged = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const [cart, setCart] = useState("");
  const [isChanged, setIsChanged] = useState(false);

  // Handle logout, clear storage, redirect.
  const handleLogout = () => {
    setIsChanged(!isChanged);
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("isAdmin");
    localStorage.removeItem("userName");
    setToken("");
    successMsg("You've Logout successfully!");
    navigate("/");
  };

  useEffect(() => {
    if (isLogged) {
      getProductsInCart()
        .then((result) => {
          setCart(result.data);
        })
        .catch((err) => {
          errorMsg(`Oops. something went wrong... ${err}`);
        });
    }
  });

  const adminPanel = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Admin Panel
    </Tooltip>
  );

  const logout = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Logout
    </Tooltip>
  );

  const options = {
    title: "Logout",
    message: "Are you sure? We will miss you here..",
    buttons: [
      {
        label: "Yes",
        onClick: () => handleLogout(),
      },
      {
        label: "No",
        onClick: () => {},
      },
    ],
    closeOnEscape: true,
    closeOnClickOutside: true,
    keyCodeForClose: [8, 32],
    willUnmount: () => {},
    afterClose: () => {},
    onClickOutside: () => {},
    onKeypress: () => {},
    onKeypressEscape: () => {},
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <label className="hamburger">
            <input
              type="checkbox"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo01"
              aria-controls="navbarTogglerDemo01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            />
            <svg viewBox="0 0 32 32">
              <path
                className="line line-top-bottom"
                d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
              ></path>
              <path className="line" d="M7 16 27 16"></path>
            </svg>
          </label>

          <NavLink className="logo navbar-brand" to="/">
            <img
              src="/images/Logo.png"
              alt="iOnline Logo"
              className="logoImg"
            />
          </NavLink>
          {isLogged ? (
            <div className="bag">
              <button className="userName" onClick={() => navigate("/cart")}>
                {cart.length ? <>{cart.length}</> : null}
                <FiShoppingBag />
              </button>
            </div>
          ) : (
            <div></div>
          )}
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/Mac">
                  Mac
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/iPad">
                  iPad
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/iPhone">
                  iPhone
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Watch">
                  Watch
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Accessories">
                  Accessories
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/About">
                  About
                </NavLink>
              </li>
            </ul>
            <div className="account">
              <div className="user d-flex gap-2 justify-content-between">
                {isLogged ? (
                  <>
                    <span>
                      {isLogged ? (
                        <button
                          className="userName bagDesktop"
                          onClick={() => navigate("/cart")}
                        >
                          {cart.length ? <>{cart.length}</> : null}
                          <FiShoppingBag />
                          {storedUserDetails}'s Bag
                        </button>
                      ) : null}
                    </span>
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 150, hide: 100 }}
                      overlay={logout}
                    >
                      <button
                        onClick={() => confirmAlert(options)}
                        className="logOutBtn"
                      >
                        <RiShutDownLine fontSize={"16pt"} />
                      </button>
                    </OverlayTrigger>
                    {userDetails.isAdmin ? (
                      <OverlayTrigger
                        placement="bottom"
                        delay={{ show: 150, hide: 100 }}
                        overlay={adminPanel}
                      >
                        <NavLink to={"/admin"} className="adminBtn">
                          <BsPersonLock color="white" fontSize={"16pt"} />
                        </NavLink>
                      </OverlayTrigger>
                    ) : null}
                  </>
                ) : (
                  <div className="loginRegisterGroup d-flex gap-3">
                    <button
                      className="navBtn signUpBtn"
                      onClick={() => navigate("/SignUp")}
                    >
                      Sign Up
                      <FiChevronRight className="icon" />
                    </button>
                    <button
                      className="navBtn loginBtn"
                      onClick={() => navigate("/Login")}
                    >
                      Login
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
