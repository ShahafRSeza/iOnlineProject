import "./carousel.css";
import { FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Carousel = () => {
  const navigate = useNavigate();
  return (
    <div className="container carousel">
      <div className="d-flex">
        <div className="text">
          <h1 className="title">Be Pro. and Beyond.</h1>
          <p>
            The all-new iPhone 14 Pro & iPhone 14 Pro Max <br />
            Available now from $999
          </p>
          <button onClick={() => navigate("/iphone")}>
            <span>
              See More
              <FiChevronRight className="icon" />
            </span>
          </button>
        </div>
        <img src="/images/iphones.png" alt="iPhone" className="carouselImg" />
      </div>
    </div>
  );
};

export default Carousel;
