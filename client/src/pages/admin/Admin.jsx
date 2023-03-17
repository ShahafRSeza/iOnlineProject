import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { errorMsg, successMsg } from "../../services/feedbackService";
import {
  getAllProducts,
  deleteProduct,
  addCommas,
} from "../../services/productsService";
import "./admin.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { BsSearch } from "react-icons/bs";
import { FiEdit2, FiDelete } from "react-icons/fi";
import { UserContext } from "../../App";
import { GrAddCircle } from "react-icons/gr";
import isLoading from "../../components/loading/Loading";
import Loading from "../../components/loading/Loading";

function Admin() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isChanged, setIsChanged] = useState(false);
  const userDetails = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState({
    Mac: false,
    iPad: false,
    iPhone: false,
    Watch: false,
    Accessories: false,
  });

  const handleCategoryChange = (category) => {
    setCategories({
      ...categories,
      [category]: !categories[category],
    });
  };

  const handleDeleteProduct = (product) => {
    deleteProduct(product)
      .then(() => {
        successMsg(`${product.title} Deleted`);
        setIsChanged(!isChanged);
      })
      .catch((err) => {
        errorMsg(`Oops. something went wrong.. ${err}`);
      });
  };

  useEffect(() => {
    getAllProducts()
      .then((result) => {
        setProducts(result.data);
        setIsLoading(true);
      })
      .catch((err) => {
        errorMsg(`Oops. something went wrong.. ${err}`);
      });
  }, [isChanged]);

  const options = (product) => ({
    title: `Delete ${product.title}`,
    message: "Are you sure You Want to delete this product?",
    buttons: [
      {
        label: "Yes",
        onClick: () => handleDeleteProduct(product),
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

  const total = products.reduce((acc, product) => {
    const price = product.price * product.quantityInStock;
    return acc + price;
  }, 0);

  const sumQuantities = (products) => {
    const totalQuantity = products.reduce((acc, product) => {
      return acc + product.quantityInStock;
    }, 0);
    return totalQuantity;
  };

  return (
    <>
      {isLoading ? (
        <>
          {" "}
          <div className="row mb-4">
            <div className="col-md-4">
              <h2>Admin Panel</h2>
              <p className="text-capitalize">
                Welcome Back, {userDetails.name}
              </p>
            </div>
            <div className="col-md-8 d-flex justify-content-between ms-auto gap-3">
              <div
                className="col adminCard addProductBtn"
                onClick={() => navigate("/addProduct")}
              >
                <GrAddCircle className="icon" />
                <h2 className="my-1">Add Product</h2>
              </div>
              <div className="col adminCard">
                <p>Total Store Value</p>
                <h2>${addCommas(total)}</h2>
              </div>
              <div className="col adminCard">
                <p>Total Products</p>
                <h2>{products.length}</h2>
              </div>
              <div className="col adminCard">
                <p>Total Quantity</p>
                <h2>{addCommas(sumQuantities(products))}</h2>
              </div>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-lg-6 col-xs-12">
              <div className="searchInput">
                <BsSearch />
                <input
                  onChange={(e) => setSearch(e.target.value)}
                  type="search"
                  className="inputInSerach"
                  placeholder="Search Product..."
                  aria-label="Search"
                  aria-describedby="addon-wrapping"
                />
              </div>
            </div>
            <div className="col col-lg-6 d-flex justify-content-end ms-auto">
              <ul className="checkCategory">
                <span>Sort: </span>
                {Object.keys(categories).map((category) => (
                  <li key={category}>
                    <input
                      type="checkbox"
                      id={category}
                      value={category}
                      onChange={() => handleCategoryChange(category)}
                    />
                    <label htmlFor={category}>{category}</label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <table className="table">
            <thead className="bg-dark">
              <tr>
                <th>&nbsp;</th>
                <th>Product</th>
                <th>Color</th>
                <th>Price</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {products
                .filter((searched) => {
                  return search.toLowerCase() === ""
                    ? searched
                    : searched.title.toLowerCase().includes(search);
                })
                .filter((selected) => {
                  if (
                    Object.keys(categories).every(
                      (category) => categories[category] === false
                    )
                  ) {
                    return selected;
                  } else {
                    return Object.keys(categories).some(
                      (category) =>
                        categories[category] === true &&
                        selected.category.includes(category)
                    );
                  }
                })
                .map((product) => (
                  <tr key={product._id}>
                    <td>
                      <img
                        src={product.image}
                        alt={product.title}
                        className="tableImg"
                        onClick={() => navigate(`/products/${product._id}`)}
                      />
                    </td>
                    <td onClick={() => navigate(`/products/${product._id}`)}>
                      <p className="tableProductTitle">{product.title}</p>
                      <span className="sku">SKU: {product._id}</span>
                    </td>
                    <td>{product.color}</td>
                    <td>${addCommas(product.price)}</td>
                    <td>{product.category}</td>
                    <td>
                      {product.quantityInStock > 0 ? (
                        <span className="inStock">
                          {product.quantityInStock}
                        </span>
                      ) : (
                        <span className="noStock">
                          {product.quantityInStock}
                        </span>
                      )}
                    </td>
                    <td>
                      <Link to={`edit/${product._id}`} className="bttn editBtn">
                        Edit <FiEdit2 />
                      </Link>
                    </td>
                    <td>
                      <button
                        className="bttn deleteBtn"
                        onClick={() => confirmAlert(options(product))}
                      >
                        Delete <FiDelete />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Admin;
