import "./card.css";
import { useNavigate } from "react-router-dom";

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
      <div
        className="imageBox"
        onClick={() => navigate(`/products/${props._id}`)}
      >
        <img src={props.image} className="productImageCard" />
      </div>
      <div className="contentCard">
        <div
          className="details"
          onClick={() => navigate(`/products/${props._id}`)}
        >
          <h2>{props.title}</h2>
          <p>$ {addComma(props.price)}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
