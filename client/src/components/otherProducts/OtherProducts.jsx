import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { errorMsg } from "../../services/feedbackService";
import { getAllProducts } from "../../services/productsService";
import Card from "../card/Card";
import "./otherproducts.css";

function OtherProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

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
        <div
          onClick={() => navigate(`/products/${product._id}`)}
          className="productCard"
          key={product._id}
        >
          <img src={product.image} className="productCardImage" />
          <h6>{product.title}</h6>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default OtherProducts;
