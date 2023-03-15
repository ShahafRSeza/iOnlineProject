import axios from "axios";
import jwt_decode from "jwt-decode";

const api = process.env.REACT_APP_API || "";

// REGISTER
export const addUser = (newUser) => {
  return axios.post(`${api}signUp`, newUser);
};

// LOGIN
export const login = (values) => {
  return axios.post(`${api}signIn`, values);
};

// GET USER DETAILS
export const getUser = () => {
  return axios.get(`${api}`, {
    headers: {
      Authorization: `${sessionStorage.getItem("token")}`,
    },
  });
};

// Get "isAdmin" payload from token
export const getIsAdmin = () => {
  return jwt_decode(sessionStorage.getItem("token")).isAdmin;
};
