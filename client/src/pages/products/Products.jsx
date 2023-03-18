import React, { useState, useEffect } from "react";
import Card from "../../components/card/Card";
import { getAllProducts } from "../../services/productsService";
import "./products.css";
import { BsSearch } from "react-icons/bs";
import Loading from "../../components/loading/Loading";
import NoProductFound from "../../components/noProductFound/NoProductFound";
import { BiColorFill } from "react-icons/bi";

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
          <div className="col-lg-3 sticky">
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

            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    <BiColorFill className="icon" /> Filter By Color
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingOne"
                  data-bs-parent="#e2e2e2ordionExample"
                >
                  <div className="mt-2">
                    <ul className="row">
                      {Object.keys(colors).map((color) => (
                        <li key={color} className="checkBox col-md-6">
                          <input
                            type="checkbox"
                            id={color}
                            value={color}
                            onChange={() => handleCategoryChange(color)}
                          />
                          <label className="checkboxBtn" htmlFor={color}>
                            {color}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="products">
              {products && products.length > 0
                ? products
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
                : null}
              {products &&
                products.length > 0 &&
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
                  }).length === 0 && (
                  <div className="noProducts">
                    <NoProductFound />
                  </div>
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
