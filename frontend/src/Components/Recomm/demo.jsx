import React, { useState, useEffect } from "react";
import styles from "./Recomm.module.css";
import { FaGreaterThan } from "react-icons/fa6";
import img1 from "../../assets/basic_civil.png";
import img2 from "../../assets/pro_ethics.jpg";
import img3 from "../../assets/uni_que.avif";
import img4 from "../../assets/coat_lab.png";
import img5 from "../../assets/civil_lab.jpg";
import img6 from "../../assets/the_eng.webp";
import RightNav from "../RightNav/RightNav";
import labImages from "../data.js";

const demo = () => {
  const [images, setImages] = useState([]);
  const [indices, setIndices] = useState([0, 1, 2, 3]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemList, setSelectedItemList] = useState([]);

  // all
  const [allImages, setAllImages] = useState([]);
  const [displayedImages, setDisplayedImages] = useState([]);
  const [labIndices, setLabIndices] = useState([0, 1, 2, 3, 4]);
  const [activeCategory, setActiveCategory] = useState("All");

  const fetchImagesFromBackend = () => {
    return Promise.resolve([
      {
        image: img1,
        name: "Basic Civil Engineering",
        description: "Basic civil Engineering Text Book for Students",
        price: 10,
        category: "Textbook",
      },
      {
        image: img2,
        name: "Professional Ethics",
        description: "Professional Ethics Text Book for Students",
        price: 20,
        category: "Textbook",
      },
      {
        image: img3,
        name: "University Questions",
        description: "University Questions Text Book for Students",
        price: 30,
        category: "Textbook",
      },
      {
        image: img4,
        name: "Lab Coat",
        description: "Lab Coat for Civil Engineering Students",
        price: 40,
        category: "Labmaterials",
      },
      {
        image: img5,
        name: "Civil Lab",
        description: "Civil Lab for Students",
        price: 50,
        category: "Labmaterials",
      },
      {
        image: img6,
        name: "Thermal Engineering",
        description: "Thermal Engineering Text Book for Students",
        price: 60,
        category: "Textbook",
      },
    ]);
  };

  useEffect(() => {
    fetchImagesFromBackend().then((fetchedImages) => {
      setImages(fetchedImages);
      setIndices(
        fetchedImages.length <= 4
          ? fetchedImages.map((_, index) => index)
          : [0, 1, 2, 3]
      );
    });
  }, []);

  const handleMoreClick = () => {
    const newIndices = indices.map((index) => (index + 1) % images.length);
    setIndices(newIndices);
  };

  const showDetails = (index) => {
    const item = images[index];
    setSelectedItem(item);
    setSelectedItemList((prevList) => [...prevList, item]);
  };

  const categories = [
    "All",
    "Notebook",
    "Textbook",
    "Supplymaterials",
    "Labmaterials",
  ];

  useEffect(() => {
    setAllImages(labImages);
    setDisplayedImages(labImages);
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

  const handleAllClick = () => {
    const newLabIndices = labIndices.map(
      (index) => (index + 1) % displayedImages.length
    );
    setLabIndices(newLabIndices);
  };
  // const showDetailsAll = (index) => {
  //   setSelectedItem(displayedImages[index]);
  // };
  const showDetailsAll = (index) => {
    const item = displayedImages[index];
    setSelectedItem(item); // Set the last selected item
    setSelectedItemList((prevList) => [...prevList, item]); // Add to selectedItemList without duplicate check
  };
  // console.log("selectedItemList", selectedItemList);
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
                {images.length > 4 && (
                  <div onClick={handleMoreClick} className={styles.btn_more}>
                    <div className={styles.btn_moretxt}>More</div>
                    <FaGreaterThan className={styles.greaterthan_icon} />
                  </div>
                )}
              </div>
              <div className={styles.books_list}>
                {indices.map(
                  (index) =>
                    images[index] && (
                      <div
                        key={index}
                        className={styles.book}
                        style={{ cursor: "pointer" }}
                        onClick={() => showDetails(index)}
                      >
                        <img
                          src={images[index].image}
                          alt={images[index].name}
                          className={styles.book_img}
                        />
                        <div className={styles.book_name}>
                          {images[index].name}
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
            {/* <FilterResource /> */}
            <div className={styles.category_recomm}>
              <div className={styles.books_head}>
                <div className={styles.recommend}>Category</div>
                {displayedImages.length > 5 && (
                  <div onClick={handleAllClick} className={styles.btn_more}>
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
                        onClick={() => showDetailsAll(index)}
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        <img
                          src={displayedImages[index].image}
                          alt={displayedImages[index].name}
                          className={styles.category_img}
                        />
                        <div className={styles.cat_name}>
                          {displayedImages[index].name}
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

export default demo;
