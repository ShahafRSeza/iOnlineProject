import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Products from "./pages/products/Products";
import Navbar from "./components/navbar/Navbar";
import About from "./pages/about/About";
import ProductDetails from "./pages/products/ProductDetails";
import SignUp from "./pages/signup/SignUp";
import Login from "./pages/login/Login";
import AdminProtected from "./components/adminProtected/AdminProtected";
import Admin from "./pages/admin/Admin";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import { getUser } from "./services/userService";
import "./App.css";
import Cart from "./pages/cart/Cart";
import Pnf from "./pages/pnf/Pnf";
import { ToastContainer } from "react-toastify";
import { errorMsg } from "./services/feedbackService";
import Footer from "./components/footer/Footer";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";

export const TokenContext = React.createContext();
export const UserContext = React.createContext();

function App() {
  const [userDetails, setUserDetails] = useState("");
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  useEffect(() => {
    const isLogged = sessionStorage.getItem("token");

    if (isLogged) {
      getUser()
        .then((result) => {
          setUserDetails(result.data);
        })
        .catch((err) => {
          errorMsg(`Oops. something went wrong.. ${err}`);
        });
    } else {
      setUserDetails("");
    }
  }, [token]);

  return (
    <Router>
      <ScrollToTop />
      <UserContext.Provider value={userDetails}>
        <TokenContext.Provider value={setToken}>
          <div className="app">
            <div className="content container">
              <ToastContainer />
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Mac" element={<Products category={"Mac"} />} />
                <Route path="/iPad" element={<Products category={"iPad"} />} />
                <Route
                  path="/iPhone"
                  element={<Products category={"iPhone"} />}
                />
                <Route
                  path="/Watch"
                  element={<Products category={"Watch"} />}
                />
                <Route
                  path="/Accessories"
                  element={<Products category={"Accessories"} />}
                />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/About" element={<About />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/Login" element={<Login setToken={setToken} />} />
                <Route path="/Cart" element={<Cart />} />
                <Route element={<AdminProtected user={userDetails} />}>
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/AddProduct" element={<AddProduct />} />
                  <Route path="/admin/edit/:id" element={<EditProduct />} />
                </Route>
                <Route path="*" element={<Pnf />} />
              </Routes>
            </div>
            <footer>
              <Footer />
            </footer>
          </div>
        </TokenContext.Provider>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
