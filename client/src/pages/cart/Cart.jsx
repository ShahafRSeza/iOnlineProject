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
import { addCommas } from "../../services/productsService";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import EmptyBag from "../../components/emptyBag/EmptyBag";

function Cart() {
  const isLogged = sessionStorage.getItem("token");
  const [isChanged, setIsChanged] = useState(false);
  const [cart, setCart] = useState([]);
  const [originalSum, setOriginalSum] = useState(0);
  const [sum, setSum] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setOriginalSum(cart.reduce((total, item) => total + item.price, 0));
    setSum(originalSum);
  }, [cart, originalSum]);

  const handleApplyCoupon = () => {
    if (coupon === "Sale25") {
      setSum(originalSum * 0.75);
      setApplied(true);
      successMsg("Congratulations! you earn 25% OFF!");
    } else {
      setApplied(false);
      errorMsg('Coupon was not found.. try "Sale25"');
    }
  };

  const checkOutBtn = () => {
    checkOut(cart)
      .then(() => {
        successMsg("Checked Out Successfully!");
        setIsChanged(!isChanged);
        navigate("/");
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
          setIsLoading(true);
        })
        .catch((err) => {
          errorMsg(`Oops. Something went wrong.. ${err}`);
        });
    } else {
    }
  }, [isChanged]);

  return (
    <>
      {isLoading ? (
        <>
          {cart.length ? (
            <div className="px-4 px-lg-0">
              <div className="row">
                <div className="col-lg-8 col-md-12">
                  <h1 className="boldTitle pt-3 pb-3">
                    <span className="productsTitle text-left">
                      Shopping Bag
                    </span>
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
                                <p className="cartCategory">
                                  {product.category}
                                </p>
                                <p className="cartProductTitle">
                                  {product.title}
                                </p>
                              </td>
                              <td className="cartColor">
                                <p className="cartCategory">Color</p>
                                <p className="cartProductTitle">
                                  {product.color}
                                </p>
                              </td>
                              <td className="cartPrice">
                                <p>${addCommas(product.price)}</p>
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

                <div className="col col-lg-4 ol-sm-12 orderSummary">
                  <h3>Order Summary</h3>
                  <div className="d-flex justify-content-between mx-2">
                    <p>{cart.length} Items</p>
                    <p className="sum">$ {addCommas((sum / 1.17).toFixed())}</p>
                  </div>
                  <div className="d-flex justify-content-between mx-2">
                    <p>Tax (17%)</p>
                    <p className="sum">
                      $ {addCommas((sum - sum / 1.17).toFixed())}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between mx-2">
                    <p>Shipping</p>
                    <p className="sum">Free</p>
                  </div>

                  <div className="d-flex justify-content-between mx-2">
                    <div className="input-group mb-3">
                      <input
                        placeholder="Coupon Code"
                        type="text"
                        className="cartInput"
                        id="coupon"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                      />
                      <button
                        className="couponBtn"
                        type="button"
                        id="button-addon2"
                        onClick={handleApplyCoupon}
                        disabled={applied}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                  <hr className="hr" />
                  <div>
                    {applied && coupon === "Sale25" && (
                      <>
                        <span className="d-flex justify-content-between mx-2">
                          <p>Subtotal</p>
                          <p className="sum">
                            $ {addCommas(originalSum.toFixed())}
                          </p>
                        </span>
                        <span className="d-flex justify-content-between mx-2 text-danger">
                          <p className="off25">25% off</p>
                          <p className="off25">
                            $ {addCommas((originalSum * 0.25).toFixed())}
                          </p>
                        </span>
                        <hr />
                      </>
                    )}
                  </div>
                  <div className="d-flex justify-content-between mx-2 my-3">
                    <p className="total">Total</p>
                    <p className="total">$ {addCommas(sum.toFixed())}</p>
                  </div>
                  <button className="signUpBtn w-100" onClick={checkOutBtn}>
                    Procced To Checkout
                  </button>
                </div>
              </div>
            </div>
          ) : null}
          {cart.length === 0 && isLogged ? (
            <>
              <EmptyBag />
            </>
          ) : null}
          {!isLogged ? (
            <div className="text-center row">
              <h2 className="text-center my-5">
                Please Login to view your bag and start shopping
              </h2>
            </div>
          ) : null}
        </>
      ) : (
        <>
          <Loading />
        </>
      )}
    </>
  );
}

export default Cart;
