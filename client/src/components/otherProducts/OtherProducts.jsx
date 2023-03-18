import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { errorMsg } from "../../services/feedbackService";
import { getAllProducts } from "../../services/productsService";
import "./otherproducts.css";

function OtherProducts() {
  const [products, setProducts] = useState([]);
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

  useEffect(() => {
    getAllProducts()
      .then((result) => {
        setProducts(
          result.data.filter((product) => product.quantityInStock > 1)
        );
      })
      .catch((err) => {
        errorMsg("oops.. something went wrong" + err);
      });
  }, []);

  const arryProducts = products.sort(() => Math.random() - 0.5).slice(0, 4);

  return (
    <div className="moreProductsArray">
      {arryProducts.map((product) => (
        <div className="card">
          <div
            className="imageBox"
            onClick={() => navigate(`/products/${product._id}`)}
          >
            <img src={product.image} />
          </div>
          <div className="contentCard">
            <div
              className="details"
              onClick={() => navigate(`/products/${product._id}`)}
            >
              <h2>{product.title}</h2>
              <p>$ {addComma(product.price)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OtherProducts;
