import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import PageVisitCounter from "../../components/PageVisitCounter/PageVisitCounter";
import { addToUserCart } from "../../services/cartService";
import { FiCheck, FiX, FiShoppingBag } from "react-icons/fi";
import { MdSecurity } from "react-icons/md";
import { AiFillApple } from "react-icons/ai";
import { TbTruck } from "react-icons/tb";
import { RiCustomerService2Line } from "react-icons/ri";
import Magnifier from "react-magnifier";
import { errorMsg, successMsg } from "../../services/feedbackService";

const ProductDetails = () => {
  const { id } = useParams();
  const api = process.env.REACT_APP_API || "";
  const navigate = useNavigate();
  const [products] = useFetch(`${api}products/${id}`);
  const [quantity, setQuantity] = useState(1);
  const isLogged = sessionStorage.getItem("token");

  const handleAddToCart = (product) => {
    product.productId = products._id;
    product.quantity = quantity;
    addToUserCart(product)
      .then(() => {
        successMsg(`${product.title} Added to Bag`);
      })
      .catch((err) => {
        errorMsg(`Oops. something went wrong.. ${err}`);
      });
  };

  const stockColors = {
    true: "green",
    false: "red",
  };
  const borderColor = stockColors[products.quantityInStock > 0];

  const background = {
    SpaceBlack: "rgb(130, 130, 130)",
    Silver: "rgb(226, 226, 226)",
    Gold: "#ead6b4",
    DeepPurple: "#534f77",
    Blue: "rgb(212, 231, 253)",
    Purple: "#b9b1c5",
    Yellow: "#f7cb57",
    Green: "rgb(229, 239, 222)",
    Midnight: "rgb(189, 189, 189)",
    Starlight: "#e1d6ce",
    Red: "rgb(255, 205, 205)",
  };
  const backgroundColor = background[products.color];

  return (
    <>
      <div className="row">
        {products?.image && (
          <div
            className="col-lg-6 productImage"
            style={{ background: backgroundColor }}
          >
            <div className="magnifier">
              <Magnifier src={products.image} />
            </div>
          </div>
        )}
        <div className="col col-lg-6 col-md-12   productDetails p-3">
          <div className="d-flex justify-content-between ">
            <p style={{ border: `1px solid ${borderColor}` }} className="stock">
              {products.quantityInStock > 0 ? (
                <span style={{ color: "green" }}>
                  <FiCheck /> In Stock
                </span>
              ) : (
                <span style={{ color: "red" }}>
                  <FiX /> Out Of Stock
                </span>
              )}
            </p>
            <PageVisitCounter />
          </div>
          <h1>{products.title}</h1>
          <p>{products.description}</p>

          <table className="table">
            <tfoot>
              <tr className="table-secondary">
                <th>Category</th>
                <td>{products.category}</td>
              </tr>
              <tr>
                <th>Color</th>
                <td>{products.color}</td>
              </tr>
              <tr className="table-secondary">
                <th>Stock</th>
                <td>
                  {products.quantityInStock > 1 ? (
                    <span>
                      Only {products.quantityInStock} units left in stock
                    </span>
                  ) : (
                    <span>Out Of Stock</span>
                  )}
                </td>
              </tr>
            </tfoot>
          </table>

          <div className="d-flex my-4 justify-content-between align-items-center">
            <p className="price">
              Price
              <span>${products.price}</span>
            </p>
            <div>
              {products.quantityInStock < 1 ? (
                <button className="orderBtn text-uppercase" disabled>
                  Out Of Stock - Check Again Later
                </button>
              ) : isLogged ? (
                <a
                  onClick={() => handleAddToCart(products)}
                  className="orderBtn"
                >
                  <FiShoppingBag /> <span>Add To Bag</span>
                </a>
              ) : (
                <button
                  className="orderBtn text-uppercase"
                  onClick={() => navigate("/login")}
                >
                  Please Login to purchase
                </button>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-between gap-3">
            <div className="policy">
              <MdSecurity />
              <span>
                Secured
                <br /> Payments
              </span>
            </div>
            <div className="policy">
              <AiFillApple />
              <span>
                Official <br />
                Warranty
              </span>
            </div>
            <div className="policy">
              <TbTruck />
              <span>
                Fast <br />
                Delivery
              </span>
            </div>
            <div className="policy">
              <RiCustomerService2Line />
              <span>
                24/7 <br />
                Custumer Service
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
