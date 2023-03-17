import "./card.css";
import { Link, useNavigate } from "react-router-dom";

const Card = (props) => {
  const navigate = useNavigate();

  const addComma = (num) => {
    if (num >= 1000) {
      const numString = num.toString();
      const firstPart = numString.slice(0, 1);
      const secondPart = numString.slice(1);
      return `${firstPart},${secondPart}`;
    } else {
      return num.toString();
    }
  };

  return (
    <div className="card">
      <div className="imageBox">
        <img src={props.image} />
      </div>
      <div className="content">
        <div className="details">
          <h2 onClick={() => navigate(`/products/${props._id}`)}>
            {props.title}
            <span
              style={{ color: props.quantityInStock > 1 ? "green" : "red" }}
            >
              {props.quantityInStock > 1 ? "IN STOCK" : "OUT OF STOCK"}{" "}
            </span>
          </h2>
          <div className="actionBtn">
            <div>
              <span>price</span>
              <h3>${addComma(props.price)}</h3>
            </div>
            <button
              onClick={() => navigate(`/products/${props._id}`)}
              className="overviewBtn"
            >
              Overview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
