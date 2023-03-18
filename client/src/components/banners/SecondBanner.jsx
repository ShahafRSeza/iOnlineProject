import "./banners.css";
import { FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const SecondBanner = () => {
  const navigate = useNavigate();
  return (
    <div className="container banner2">
      <div className="d-flex">
        <div>
          <h1 className="title">
            Apple
            <br /> Watch
          </h1>
          <button className="smallBtn" onClick={() => navigate("/watch")}>
            <span>
              See More
              <FiChevronRight className="icon" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecondBanner;
