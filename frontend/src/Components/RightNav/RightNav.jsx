import React from "react";
import styles from "./RightNav.module.css";
import civil from "../../assets/civil.png";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
const RightNav = () => {
  return (
    <div>
      <div className={styles.rightnav_cont}>
        <img src={civil} className={styles.resource_img} />
        <div className={styles.text_head}>Basic Mechanical Engineering</div>
        <div className={styles.text_subhead}>J Benjamin</div>
        <div>
          <FaStar className={styles.stars} />
          <FaStar className={styles.stars} />
          <CiStar className={styles.stars} />
          <CiStar className={styles.stars} />
          <CiStar className={styles.stars} />
        </div>
        <div className={styles.resource_details}>
          Basic Mechanical Engineering" by J. Benjamin is an essential reference
          for KTU students, perfectly aligned with their syllabus. This
          comprehensive textbook covers mechanics, thermodynamics, and other
          vital topics, providing clear explanations and helpful diagrams.
        </div>
        <button className={styles.rightnav_btn}>Rent</button>
      </div>
    </div>
  );
};

export default RightNav;
