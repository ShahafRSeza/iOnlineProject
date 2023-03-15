import React from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../services/productsService";
import * as yup from "yup";
import { useFormik } from "formik";
import "./addProduct.css";
import { errorMsg, successMsg } from "../../services/feedbackService";

function AddProduct() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      price: 0,
      description: "",
      color: "",
      image: "",
      quantityInStock: "",
    },
    validationSchema: yup.object({
      title: yup.string().required().min(2),
      category: yup.string().required(),
      price: yup.number().required().min(2, "plese insernt price"),
      description: yup.string().required().min(6),
      color: yup.string().required().min(2),
      image: yup.string().required(),
      quantityInStock: yup.number().required(),
    }),
    onSubmit: (values) => {
      addProduct(values)
        .then((result) => {
          successMsg(`${result.data.title} Added to Store`);
          navigate(-1);
        })
        .catch((err) => {
          errorMsg(`Oops. Something went wrong.. ${err}`);
        });
    },
  });

  return (
    <>
      <h1 className="mb-4">
        <span className="mx-5 addProductsTitle">Add New Product</span>
      </h1>
      <form onSubmit={formik.handleSubmit} className="px-5">
        <div class="row">
          <div class="col-lg-7 col-sm-12">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Product Name
              </label>
              <input
                type="text"
                className="productInput"
                id="title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.title && formik.errors.title ? (
                <p className="text-danger">{formik.errors.title}</p>
              ) : null}
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="productInput"
                id="price"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.price && formik.errors.price ? (
                <p className="text-danger">{formik.errors.price}</p>
              ) : null}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Category
              </label>

              <select
                className="productInput"
                id="category"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="" disabled>
                  Choose
                </option>
                <option value="Mac">Mac</option>
                <option value="iPad">iPad</option>
                <option value="iPhone">iPhone</option>
                <option value="Watch">Watch</option>
                <option value="Accessories">Accessories</option>
              </select>
              {formik.touched.category && formik.errors.category ? (
                <p className="text-danger">{formik.errors.category}</p>
              ) : null}
            </div>
          </div>
          <div className="col-lg-5">
            <div className="mb-3">
              <label htmlFor="color" className="form-label">
                Color
              </label>
              <select
                className="productInput"
                id="color"
                name="color"
                value={formik.values.color}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <optgroup label="Pro/Max Collection">
                  <option value="SpaceBlack">Space Black</option>
                  <option value="Silver">Silver</option>
                  <option value="Gold">Gold</option>
                  <option value="DeepPurple">Deep Purple</option>
                </optgroup>
                <optgroup label="Others">
                  <option value="Blue">Blue</option>
                  <option value="Purple">Purple</option>
                  <option value="Yellow">Yellow</option>
                  <option value="Green">Green</option>
                  <option value="Midnight">Midnight</option>
                  <option value="Starlight">Starlight</option>
                  <option value="RED">(PRODUCT)RED</option>
                </optgroup>
              </select>
              {formik.touched.color && formik.errors.color ? (
                <p className="text-danger">{formik.errors.color}</p>
              ) : null}
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="quantityInStock" className="form-label">
                Quantity
              </label>
              <input
                type="number"
                className="productInput"
                id="quantityInStock"
                name="quantityInStock"
                value={formik.values.quantityInStock}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.quantityInStock &&
              formik.errors.quantityInStock ? (
                <p className="text-danger">{formik.errors.quantityInStock}</p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            type="text"
            className="textarea"
            placeholder="Description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            cols="20"
            rows="5"
          ></textarea>
          {formik.touched.description && formik.errors.description ? (
            <p className="text-danger">{formik.errors.description}</p>
          ) : null}
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <input
            id="image"
            type="text"
            className="productInput"
            placeholder="image"
            name="image"
            value={formik.values.image}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.image && formik.errors.image ? (
            <p className="text-danger">{formik.errors.image}</p>
          ) : null}
        </div>

        <div className="d-flex gap-3 mt-4 mb-5">
          <button type="submit" className="signUpBtn">
            Add Product
          </button>
          <span className="navBtn loginBtn" onClick={() => navigate(-1)}>
            Exit
          </span>
        </div>
      </form>
    </>
  );
}

export default AddProduct;
