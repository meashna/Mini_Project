import React from "react";
import styles from "./Seller.module.css";

const ProductList = ({
  productName,
  productDescription,
  productCategory,
  productPrice,
  productImage,
}) => {
  console.log("This is product", productImage);
  const imageUrl = `http://localhost:3000/uploads/${productImage}`;
  console.log("This is image url", imageUrl);
  return (
    <div>
      <div>
        <div className={styles.product_div}>
          {/* <img className={styles.pro_img} src={productImage}></img> */}
          <img className={styles.pro_img} src={imageUrl} alt={productName} />

          <div className={styles.pro_title}>Title is : {productName}</div>
          <div className={styles.pro_desp}>
            Description is : {productDescription}
          </div>
          <div className={styles.pro_cat}> Category is : {productCategory}</div>
          <div className={styles.pro_price}> Price is : {productPrice}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
