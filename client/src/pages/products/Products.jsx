import React, { useState, useEffect } from "react";
import Card from "../../components/card/Card";
import { getAllProducts } from "../../services/productsService";
import "./products.css";
import { BsSearch } from "react-icons/bs";

const Products = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const productsApi = async (productCategory) => {
    const request = await getAllProducts();
    if (request.status === 200) {
      const productsList = request.data.filter((item) => {
        return item.category === productCategory;
      });
      setProducts(productsList);
    }
  };

  useEffect(() => {
    productsApi(category);
  }, [category]);

  return (
    <>
      <div className="d-flex justify-content-between productsHeader">
        <h1 className="productsTitle">{category}</h1>
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

      <div className="products">
        {products && products.length > 0 ? (
          products
            .filter((searched) => {
              return search.toLowerCase() === ""
                ? searched
                : searched.title.toLowerCase().includes(search);
            })
            .map((item) => (
              <Card
                key={item._id}
                _id={item._id}
                title={item.title}
                image={item.image}
                price={item.price}
                quantityInStock={item.quantityInStock}
              />
            ))
        ) : (
          <p>No Products</p>
        )}
      </div>
    </>
  );
};

export default Products;
