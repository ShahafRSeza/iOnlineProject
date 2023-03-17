import axios from "axios";
import _ from "lodash";

const api = process.env.REACT_APP_API || "";

// Add New Product
export const addProduct = (newProduct) => {
  return axios.post(`${api}products`, newProduct, {
    headers: {
      Authorization: `${sessionStorage.getItem("token")}`,
    },
  });
};

// Get All Products
export const getAllProducts = () => {
  return axios.get(`${api}products`);
};

// Get product by ID
export const getProductById = (id) => {
  return axios.get(`${api}products/${id}`);
};

// Get product by brand
export const getProductByBrand = (brand) => {
  return axios.get(`${api}products/${brand}`);
};

// Edit Products
export const editProduct = (product) => {
  let body = _.omit(product, ["_id"]);
  return axios.put(`${api}products/${product._id}`, body, {
    headers: { Authorization: `${sessionStorage.getItem("token")}` },
  });
};

// Delete Product
export const deleteProduct = (product) => {
  return axios.delete(`${api}products/${product._id}`, {
    headers: { Authorization: `${sessionStorage.getItem("token")}` },
  });
};

// global function to add comma if the number bigger than 999
export const addCommas = (number) => {
  var numberStr = number.toString();
  var chars = numberStr.split("");
  chars.reverse();
  for (var i = 3; i < chars.length; i += 4) {
    chars.splice(i, 0, ",");
  }
  var result = chars.reverse().join("");
  return result;
};
