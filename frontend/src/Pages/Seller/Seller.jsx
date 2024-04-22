import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Seller.module.css";
import ProductList from "./ProductList";

const Seller = () => {
  const userId = sessionStorage.getItem("id");
  const username = localStorage.getItem("username") || "Guest";
  const [productList, setProductList] = useState([]);
  const [inputs, setInputs] = useState({
    productName: "",
    productDescription: "",
    productCategory: "",
    productPrice: 0,
    productImage: "",
  });

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:3000/api/v1/getProducts/${userId}`
  //       );
  //       setProductList(response.data.products || []);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //       setProductList([]);
  //     }
  //   };
  //   fetchProducts();
  // });

  useEffect(() => {
    const fetchProducts = async () => {
      if (!userId) {
        console.error("No user ID provided.");
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/getProducts/${userId}`
        );
        setProductList(response.data || []);
        // console.log("API Response:", response.data);
        console.log("UseEffect Product List:", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProductList([]);
      }
    };
    fetchProducts();
  }, [userId]);

  //for fetching images

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", inputs.productName);
    formData.append("productDescription", inputs.productDescription);
    formData.append("productCategory", inputs.productCategory);
    formData.append("productPrice", inputs.productPrice);
    formData.append("userId", userId);
    if (inputs.productImage) {
      formData.append("productImage", inputs.productImage);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/addProduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("handleSubmit response.data:", response.data);
      console.log("handleSubmit response.data.product:", response.data.product);
      setProductList([...productList, response.data.product]);
      console.log("handleSubmit ProductList:", productList);
      setInputs({
        productName: "",
        productDescription: "",
        productCategory: "",
        productPrice: 0,
        productImage: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div>
      <div className={styles.form_seller}>
        <h1> Hi {username}, Sell Something</h1>
        <form onSubmit={handleSubmit} className={styles.form_items}>
          <div>
            {" "}
            <label className={styles.form_label}>Product Name</label>
            <input
              type="text"
              name="productName"
              onChange={handleChange}
              value={inputs.productName}
              placeholder="Enter your Product Name"
              required
              className={styles.form_field}
            />
          </div>
          <div>
            {" "}
            <label className={styles.form_label}>Product Description</label>
            <input
              type="text"
              name="productDescription"
              onChange={handleChange}
              value={inputs.productDescription}
              placeholder="Enter your Product Description"
              pattern="[A-Za-z ]+"
              required
              className={styles.form_field}
            />
          </div>
          <div>
            {" "}
            <label className={styles.form_label}>Product Category</label>
            <select
              name="productCategory"
              onChange={handleChange}
              value={inputs.productCategory}
              required
              className={styles.form_field}
            >
              <option value="Textbook">Textbook</option>
              <option value="Labmaterials">Labmaterials</option>
              <option value="Supplymaterials">Supplymaterials</option>
              <option value="Notebook">Notebook</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            {" "}
            <label className={styles.form_label}>Product Price</label>
            <input
              type="number"
              name="productPrice"
              onChange={handleChange}
              value={inputs.productPrice}
              placeholder="Enter your Product Price"
              min="0"
              required
              className={styles.form_field}
            />
          </div>
          <div>
            {" "}
            <label className={styles.form_label}>Product Image</label>
            <input
              type="file"
              id="mediaUpload"
              name="productImage"
              accept="image/*"
              onChange={handleChange}
              className={styles.form_field}
            />
          </div>

          <button type="submit">Add Product</button>
        </form>
      </div>
      <div className={styles.mainpro_div}>
        {productList.map((item, index) => (
          <ProductList
            key={index}
            productName={item.productName}
            productDescription={item.productDescription}
            productCategory={item.productCategory}
            productPrice={item.productPrice}
            productImage={item.productImage}
          />
        ))}
      </div>
    </div>
  );
};

export default Seller;
