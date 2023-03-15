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
