import React, { useState, useEffect } from "react";
import Card from "../../components/card/Card";
import { getAllProducts } from "../../services/productsService";
import "./products.css";
import { BsSearch } from "react-icons/bs";
import Loading from "../../components/loading/Loading";

const Products = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const productsApi = async (productCategory) => {
    const request = await getAllProducts();
    if (request.status === 200) {
      const productsList = request.data.filter((item) => {
        return item.category === productCategory;
      });
      setProducts(productsList);
      setIsLoading(true);
    }
  };

  const [colors, setColors] = useState({
    SpaceBlack: false,
    Midnight: false,
    Starlight: false,
    Silver: false,
    Gold: false,
    DeepPurple: false,
    Blue: false,
    Yellow: false,
    Green: false,
    Red: false,
  });

  const handleCategoryChange = (color) => {
    setColors({
      ...colors,
      [color]: !colors[color],
    });
  };

  useEffect(() => {
    productsApi(category);
  }, [category]);

  return (
    <>
      {isLoading ? (
        <div className="row my-4">
          <div className="col-lg-3">
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

            <p className="filter mt-4">
              <span>Filter By Color</span>
            </p>
            <div className="selectColors d-flex justify-content-between gap-2 flex-wrap">
              {Object.keys(colors).map((color) => (
                <span key={color} className="checkBox">
                  <input
                    type="checkbox"
                    id={color}
                    value={color}
                    onChange={() => handleCategoryChange(color)}
                  />
                  <label className="checkboxBtn" htmlFor={color}>
                    {color}
                  </label>
                </span>
              ))}
            </div>
          </div>
          <div className="col">
            <div className="products">
              {products && products.length > 0 ? (
                products
                  .filter((searched) => {
                    return search.toLowerCase() === ""
                      ? searched
                      : searched.title.toLowerCase().includes(search);
                  })
                  .filter((selected) => {
                    if (
                      Object.keys(colors).every(
                        (color) => colors[color] === false
                      )
                    ) {
                      return selected;
                    } else {
                      return Object.keys(colors).some(
                        (color) =>
                          colors[color] === true &&
                          selected.color.includes(color)
                      );
                    }
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
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Products;
