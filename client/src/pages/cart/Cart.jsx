import React, { useState, useEffect } from "react";
import {
  getProductsInCart,
  checkOut,
  deleteProductFromCart,
} from "../../services/cartService";
import { errorMsg, successMsg } from "../../services/feedbackService";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./cart.css";
import { BsTrash3 } from "react-icons/bs";

function Cart() {
  const [products, setProducts] = useState([]);
  const isLogged = sessionStorage.getItem("token");
  const [isChanged, setIsChanged] = useState(false);
  const [cart, setCart] = useState([]);
  const [sum, setSum] = useState(0);
  const [coupon, setCoupon] = useState("");

  useEffect(() => {
    setSum(cart.reduce((total, item) => total + item.price, 0));
  }, [cart]);

  useEffect(() => {
    if (coupon === "welcome25") {
      setSum(sum * 0.75);
    }
  }, [coupon]);

  const checkOutBtn = () => {
    checkOut(cart)
      .then(() => {
        successMsg("Checked Out Successfully!");
        setIsChanged(!isChanged);
      })
      .catch((err) => {
        errorMsg(`Oops. Something went wrong.. ${err}`);
      });
  };

  const handleDeleteProductFromCart = (product) => {
    deleteProductFromCart(product)
      .then(() => {
        getProductsInCart().then((result) => {
          setCart(result.data);
        });
        successMsg(`${product.title} Deleted from your bag`);
        setIsChanged(!isChanged);
      })
      .catch((err) => {
        errorMsg(`Oops. Something went wrong.. ${err}`);
      });
  };

  const options = (product) => ({
    title: `Remove ${product.title} from Bag?`,
    message: "Are you sure?",
    buttons: [
      {
        label: "Yes",
        onClick: () => handleDeleteProductFromCart(product),
      },
      {
        label: "No",
        onClick: () => {},
      },
    ],
    closeOnEscape: true,
    closeOnClickOutside: true,
    keyCodeForClose: [8, 32],
    willUnmount: () => {},
    afterClose: () => {},
    onClickOutside: () => {},
    onKeypress: () => {},
    onKeypressEscape: () => {},
  });

  useEffect(() => {
    if (isLogged) {
      getProductsInCart()
        .then((result) => {
          setCart(result.data);
        })
        .catch((err) => {
          errorMsg(`Oops. Something went wrong.. ${err}`);
        });
    } else {
    }
  }, [isChanged]);

  return (
    <>
      {cart.length ? (
        <div className="px-4 px-lg-0">
          <div className="row">
            <div className="col-lg-8 col-md-12">
              <h1 className="boldTitle pt-3 pb-3">
                <span className="productsTitle text-left">Shopping Bag</span>
              </h1>
              <div className="mb-4 cart">
                <table className="table">
                  <tbody>
                    {cart.map((product) => {
                      return (
                        <tr key={product._id}>
                          <th>
                            <img
                              className="cartImg"
                              src={product.image}
                              alt={product.title}
                            />
                          </th>
                          <td>
                            <p className="cartCategory">{product.category}</p>
                            <p className="cartProductTitle">{product.title}</p>
                          </td>
                          <td className="cartColor">
                            <p className="cartCategory">Color</p>
                            <p className="cartProductTitle">{product.color}</p>
                          </td>
                          <td className="cartPrice">
                            <p>${product.price}</p>
                          </td>
                          <td>
                            <button
                              className="bttn deleteBtn"
                              onClick={() => confirmAlert(options(product))}
                            >
                              <BsTrash3 />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="col col-lg-4 ol-sm-12 p-3 p-3 orderSummary">
              <h3>Order Summary</h3>
              <div className="d-flex justify-content-between mx-2">
                <p>{cart.length} Items</p>
                <p className="sum">$ {(sum / 1.17).toFixed()}</p>
              </div>
              <div className="d-flex justify-content-between mx-2">
                <p>Tax (17%)</p>
                <p className="sum">$ {(sum - sum / 1.17).toFixed()}</p>
              </div>
              <div className="d-flex justify-content-between mx-2">
                <p>Shipping</p>
                <p className="sum">Free</p>
              </div>

              <div className="d-flex justify-content-between mx-2">
                <label htmlFor="coupon">Coupon code:</label>
                <input
                  type="text"
                  className="cartInput"
                  id="coupon"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />
              </div>
              <hr />

              <div className="d-flex justify-content-between mx-2 my-3 sum">
                <p>Total</p>
                <p>$ {sum.toFixed()}</p>
              </div>
              <button className="signUpBtn w-100" onClick={checkOutBtn}>
                Check Out
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {cart.length === 0 && isLogged ? (
        <div className="text-center row">
          <h1 className="boldTitle pt-3">
            <span className="productsTitle text-left">Shopping Bag</span>
          </h1>
          <h4 className="text-center mt-3 boldTitle">
            You don't have items in your bag
          </h4>
        </div>
      ) : null}
      {!isLogged ? (
        <div className="text-center row">
          <h2 className="text-center my-5">
            Please Login to view your bag and start shopping
          </h2>
        </div>
      ) : null}
    </>
  );
}

export default Cart;
