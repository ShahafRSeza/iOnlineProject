import "../banners/banners.css";
import { FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Sale = () => {
  const navigate = useNavigate();
  return (
    <div className="container saleBanner">
      <div className="d-flex saleText justify-content-center">
        {/* <div>
          <p className="saleprice">20% OFF</p>
          <h1 className="saleTitle">FINAL SALE</h1>
          <button className="smallBtn" onClick={() => navigate("/mac")}>
            <span>
              See More
              <FiChevronRight className="icon" />
            </span>
          </button>
        </div> */}
        <div className="text-white text-center">
          <p>Code Copun for 25% OFF</p>
          <h2>welcome25</h2>
        </div>
      </div>
    </div>
  );
};

export default Sale;
