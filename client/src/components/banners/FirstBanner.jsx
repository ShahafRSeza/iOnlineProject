import "./banners.css";
import { FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const FirstBanner = () => {
  const navigate = useNavigate();
  return (
    <div className="container banner1">
      <div className="d-flex">
        <div>
          <h1 className="bannersTitle">MacBook Pro 13”</h1>
          <button className="smallBtn" onClick={() => navigate("/mac")}>
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

export default FirstBanner;
