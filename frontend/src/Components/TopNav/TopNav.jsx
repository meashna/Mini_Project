import React from "react";
import styles from "./TopNav.module.css";
import { CiSearch } from "react-icons/ci";
import sarah from "../../assets/sarah.jpg";

const TopNav = () => {
  return (
    <div>
      <div className={styles.topnav_cont}>
        <div className={styles.search_box}>
          <CiSearch className={styles.search_icon} />
          <input
            className={styles.search_input}
            type="text"
            placeholder="Search here for your book"
          />
        </div>
        <div className={styles.pro_details}>
          <div className={styles.pro_name}>Hello Sarah!</div>
          <img src={sarah} className={styles.pro_pic} />
        </div>
      </div>
    </div>
  );
};

export default TopNav;
