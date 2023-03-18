import { NavLink } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { successMsg } from "../../services/feedbackService";
import "./footer.css";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  const handleSubscribe = () => {
    successMsg("You're subscribed!");
  };
  return (
    <div className="footer mt-3">
      <div className="container">
        <div className="row d-flex justify-content-between">
          <div className="col-sm-5 about">
            <img
              src="./images/LogoWhite.png"
              alt="iOnline Logo"
              className="logo"
            />
            <p>
              iOnline store offers a premium shopping experience for customers
              seeking the latest and greatest from Apple.{" "}
              <NavLink to={"/about"}>Continue reading...</NavLink>
            </p>
          </div>
          <div className="col col-lg-2 col-sm-3">
            <h6 className="mt-4">Store</h6>
            <div className="d-flex desktopNav">
              <ul className="footerNav">
                <li>
                  <NavLink to={"/Mac"}>Mac</NavLink>
                </li>
                <li>
                  <NavLink to={"/iPad"}>iPad</NavLink>
                </li>
                <li>
                  <NavLink to={"/iPhone"}>iPhone</NavLink>
                </li>
              </ul>
              <ul className="footerNav">
                <li>
                  <NavLink to={"/watch"}>Watch</NavLink>
                </li>
                <li>
                  <NavLink to={"/Accessories"}>Accessories</NavLink>
                </li>
              </ul>
            </div>
            <div className="responsiveNav">
              <ul>
                <li>
                  <NavLink to={"/Mac"}>Mac</NavLink>
                </li>
                <li>
                  <NavLink to={"/iPad"}>iPad</NavLink>
                </li>
                <li>
                  <NavLink to={"/iPhone"}>iPhone</NavLink>
                </li>
                <li>
                  <NavLink to={"/watch"}>Watch</NavLink>
                </li>
                <li>
                  <NavLink to={"/Accessories"}>Accessories</NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4 col-sm-12 subscribeBox">
            <h6 className="mt-4">Subscribe</h6>
            <p>Get all the latest products and sales!</p>
            <div className="subscribe d-flex flex-grow-1">
              <span>
                <HiOutlineMail />
              </span>
              <input
                type="text"
                placeholder="Your Email"
                className="flex-grow-1"
              />
              <button onClick={handleSubscribe}>Subscribe</button>
            </div>
          </div>
        </div>
        <hr />
        <p className="rights">
          Developed & Designed by Shahaf Seza - All Right Resorved {year} ©
        </p>
      </div>
    </div>
  );
};

export default Footer;
