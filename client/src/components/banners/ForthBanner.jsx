import "./banners.css";
import { FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ForthBanner = () => {
  const navigate = useNavigate();
  return (
    <div className="container banner4">
      <div className="d-flex">
        <div>
          <h1 className="title">
            The New
            <br /> iPad Pro
          </h1>
          <button className="smallBtn" onClick={() => navigate("/iPad")}>
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

export default ForthBanner;
