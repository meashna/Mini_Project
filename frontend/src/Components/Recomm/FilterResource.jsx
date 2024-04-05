import React, { useState, useEffect } from "react";
import styles from "./Recomm.module.css";
import { FaGreaterThan } from "react-icons/fa";
import labImages from "../data.js";
import RightNav from "../RightNav/RightNav";
const FilterResource = () => {
  const [allImages, setAllImages] = useState([]);
  const [displayedImages, setDisplayedImages] = useState([]);
  const [labIndices, setLabIndices] = useState([0, 1, 2, 3, 4]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);

  const categories = [
    "All",
    "Textbook",
    "Notebook",
    "Supplymaterials",
    "Labmaterials",
  ];

  useEffect(() => {
    setAllImages(labImages);
    setDisplayedImages(labImages); // Initially display all images
  }, []);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (category === "All") {
      setDisplayedImages(allImages);
      setLabIndices(
        allImages.length <= 5
          ? allImages.map((_, index) => index)
          : [0, 1, 2, 3, 4]
      );
    } else {
      const filteredImages = allImages.filter(
        (image) => image.category === category
      );
      setDisplayedImages(filteredImages);
      setLabIndices(
        filteredImages.length <= 4
          ? filteredImages.map((_, index) => index)
          : [0, 1, 2, 3, 4]
      );
    }
  };

  const handleMoreClick = () => {
    const newLabIndices = labIndices.map(
      (index) => (index + 1) % displayedImages.length
    );
    setLabIndices(newLabIndices);
  };
  const showDetails = (index) => {
    setSelectedItem(displayedImages[index]);
  };

  return (
    <div className={styles.category_recomm}>
      <div className={styles.books_head}>
        <div className={styles.recommend}>Personalized Notes For You</div>
        {displayedImages.length > 5 && (
          <div onClick={handleMoreClick} className={styles.btn_more}>
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
        {labIndices.map(
          (index) =>
            displayedImages[index] && (
              <div
                key={index}
                className={styles.category}
                onClick={() => showDetails(index)}
                style={{
                  cursor: "pointer",
                }}
              >
                <img
                  src={displayedImages[index].image}
                  alt={displayedImages[index].name}
                  className={styles.category_img}
                />
                <div className={styles.cat_name_name}>
                  {displayedImages[index].name}
                </div>
              </div>
            )
        )}
      </div>
      {/* <div className={styles.rightcol}>
        <RightNav selectedItem={selectedItem} />
      </div> */}
    </div>
  );
};

export default FilterResource;
