import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Recomm.module.css";
import { FaGreaterThan } from "react-icons/fa6";
import RightNav from "../RightNav/RightNav";

const Recomm = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log("Updated products:", products);
  }, [products]); // This useEffect runs whenever 'products' changes

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/getAllProducts"
        );
        console.log("response.data from bckend in useeffect:", response.data);
        setProducts(response.data);
        console.log("products:", products);
        const length = response.data.length;
        console.log("length:", length);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleMoreClick = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % products.length;
      return nextIndex;
    });
  };

  return (
    <div>
      <div className={styles.bottomrow}>
        <div className={styles.leftcol}>
          <div className={styles.reccom_maincont}>
            <div className={styles.books_recomm}>
              <div className={styles.books_head}>
                <div className={styles.recommend}>
                  Personalised Notes For You
                </div>
                {products.length > 1 && (
                  <div onClick={handleMoreClick} className={styles.btn_more}>
                    <div className={styles.btn_moretxt}>More</div>
                    <FaGreaterThan className={styles.greaterthan_icon} />
                  </div>
                )}
              </div>
              <div className={styles.books_list}>
                {products.map((product) => (
                  <div
                    key={product._id}
                    className={styles.book}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={`http://localhost:3000/uploads/${product.productImage}`}
                      alt={product.productName}
                      className={styles.book_img}
                    />
                    <div className={styles.book_name}>
                      {product.productName}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.rightcol}>
          {/* <RightNav selectedItem={selectedItem} /> */}
        </div>
      </div>
    </div>
  );
};

export default Recomm;
