import axios from "axios";
import _ from "lodash";

const api = process.env.REACT_APP_API || "";

// ADD PRODUCT TO CART
export const addToUserCart = (product) => {
  let body = _.omit(product, ["_id", "quantityInStock", "__v", "quantity"]);
  return axios.post(`${api}cart`, body, {
    headers: { Authorization: `${sessionStorage.getItem("token")}` },
  });
};

// GET ALL
export const getProductsInCart = () => {
  return axios.get(`${api}cart`, {
    headers: {
      Authorization: `${sessionStorage.getItem("token")}`,
    },
  });
};

// DELETE PRODUCT FROM CART
export const deleteProductFromCart = (product) => {
  return axios.delete(`${api}cart/delete-product/${product.productId}`, {
    headers: { Authorization: `${sessionStorage.getItem("token")}` },
  });
};

// DELETE ALL PRODUCTS FROM CART
export const checkOut = () => {
  return axios.delete(`${api}cart`, {
    headers: {
      Authorization: `${sessionStorage.getItem("token")}`,
    },
  });
};
