import { React, useState } from "react";
import styles from "./RightNav.module.css";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { useCart } from "../../Context/CartContext";
import Swal from "sweetalert";

const RightNav = ({ selectedItem }) => {
  const { addToCart } = useCart();
  const handleAddToCart = () => {
    addToCart(selectedItem);
    alert("Item added to cart");
  };
  return (
    <div>
      {selectedItem && (
        <div className={styles.rightnav_cont}>
          <img src={selectedItem.image} className={styles.resource_img} />
          <div className={styles.text_head}>{selectedItem.name}</div>
          <div className={styles.text_subhead}>J Benjamin</div>
          <div>
            <FaStar className={styles.stars} />
            <FaStar className={styles.stars} />
            <CiStar className={styles.stars} />
            <CiStar className={styles.stars} />
            <CiStar className={styles.stars} />
          </div>
          <div className={styles.resource_details}>
            {selectedItem.description}
          </div>
          <button
            className={styles.rightnav_btn}
            // onClick={() => addToCart(selectedItem)}
            onClick={handleAddToCart}
          >
            Rent
          </button>
        </div>
      )}
    </div>
  );
};

export default RightNav;
