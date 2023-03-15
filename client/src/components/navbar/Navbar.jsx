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

function Navbar(props) {
  const setToken = useContext(TokenContext);
  const userDetails = useContext(UserContext);
  const storedUserDetails = localStorage.getItem("userName");
  const isLogged = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const [cart, setCart] = useState("");
  const cartChange = props.cartChange;
  const cartRender = props.cartRender;
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
    <nav className="navbar navbar-expand-lg ">
      <div className="container-fluid">
        <div className="userResponsiveNav">
          {isLogged ? (
            <button className="userName" onClick={() => navigate("/cart")}>
              {cart.length ? <>{cart.length}</> : null}
              <FiShoppingBag />
            </button>
          ) : null}
        </div>
        <NavLink className="logo navbar-brand" to="/">
          <img src="/images/Logo.png" alt="iOnline Logo" className="logoImg" />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0 mx-auto">
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

          <div className="user d-flex gap-2">
            {isLogged ? (
              <>
                <span>
                  {isLogged ? (
                    <button
                      className="userName"
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
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
