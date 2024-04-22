import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Recomm.module.css";
import { FaGreaterThan } from "react-icons/fa6";
import RightNav from "../RightNav/RightNav";

const Recomm = () => {
  const maxBooksDisplay = 4;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  // For filtered products
  const maxBooksDisplayFilter = 5;
  const [currentIndexFilter, setCurrentIndexFilter] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = [
    "All",
    "Textbook",
    "Notebook",
    "Supplymaterials",
    "Labmaterials",
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/getAllProducts"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleMoreClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const getDisplayProducts = () => {
    let displayProducts = [];
    for (let i = 0; i < maxBooksDisplay; i++) {
      const index = (currentIndex + i) % products.length;
      displayProducts.push(products[index]);
    }
    return displayProducts;
  };

  // For filtered products
  const handleMoreClickFilter = () => {
    const filteredProducts = getFilteredProducts();
    if (filteredProducts.length > maxBooksDisplayFilter) {
      setCurrentIndexFilter(
        (prevIndex) => (prevIndex + 1) % filteredProducts.length
      );
    }
  };

  const getFilteredProducts = () => {
    if (activeCategory === "All") {
      return products;
    } else {
      return products.filter(
        (product) => product.productCategory === activeCategory
      );
    }
  };

  const getDisplayProductsFilter = () => {
    const filteredProducts = getFilteredProducts();
    let displayProductsFilter = [];
    for (let i = 0; i < maxBooksDisplayFilter; i++) {
      const index = (currentIndexFilter + i) % filteredProducts.length;
      displayProductsFilter.push(filteredProducts[index]);
    }
    return displayProductsFilter;
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setCurrentIndexFilter(0);
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
                {products.length > 3 && (
                  <div onClick={handleMoreClick} className={styles.btn_more}>
                    <div className={styles.btn_moretxt}>More</div>
                    <FaGreaterThan className={styles.greaterthan_icon} />
                  </div>
                )}
              </div>
              <div className={styles.books_list}>
                {getDisplayProducts().map(
                  (product) =>
                    product && (
                      <div
                        key={product.keyIndex}
                        className={styles.book}
                        style={{ cursor: "pointer" }}
                        onClick={() => setSelectedItem(product)}
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
                    )
                )}
              </div>
            </div>
            {/* Filtered Products */}
            <div className={styles.category_recomm}>
              <div className={styles.books_head}>
                <div className={styles.recommend}>
                  Personalized Notes For You
                </div>
                {getFilteredProducts().length > 5 && (
                  <div
                    onClick={handleMoreClickFilter}
                    className={styles.btn_more}
                  >
                    <div className={styles.btn_moretxt}>More</div>
                    <FaGreaterThan className={styles.greaterthan_icon} />
                  </div>
                )}
              </div>
              <div className={styles.category_options}>
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className={styles.category_btn}
                    onClick={() => handleCategoryClick(category)}
                    style={{
                      background:
                        category === activeCategory
                          ? "linear-gradient(90deg, #384C79 0%, #468393 100%)"
                          : "#A09F9F",
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <div className={styles.category_list}>
                {getDisplayProductsFilter().map(
                  (product) =>
                    product && (
                      <div
                        key={product.keyIndex}
                        className={styles.category}
                        onClick={() => setSelectedItem(product)}
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          src={`http://localhost:3000/uploads/${product.productImage}`}
                          alt={product.productName}
                          className={styles.category_img}
                        />
                        <div className={styles.cat_name}>
                          {product.productName}
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.rightcol}>
          <RightNav selectedItem={selectedItem} />
        </div>
      </div>
    </div>
  );
};

export default Recomm;
