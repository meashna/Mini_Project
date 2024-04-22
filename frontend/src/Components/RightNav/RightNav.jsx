import { React, useState } from "react";
import styles from "./RightNav.module.css";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { useCart } from "../../Context/CartContext";
import Swal from "sweetalert";
import axios from "axios";

const RightNav = ({ selectedItem }) => {
  const userId = sessionStorage.getItem("id");
  const { addToCart } = useCart();
  const handleAddToCart = () => {
    addToCart(selectedItem);
    alert("Item added to cart");
  };
  console.log("Selected Item", selectedItem);
  const imageUrl = selectedItem
    ? `http://localhost:3000/uploads/${selectedItem.productImage}`
    : null;
  console.log("This is image url", imageUrl);
  // const handleAddToCart = async () => {
  //   if (!selectedItem) {
  //     Swal("No product selected!");
  //     return;
  //   }

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:3000/api/v1/buyProducts",
  //       {
  //         productId: selectedItem._id,
  //         userId: userId,
  //       }
  //     );

  //     // Alert success message
  //     Swal({
  //       title: "Success!",
  //       text: response.data.message,
  //       icon: "success",
  //     });
  //   } catch (error) {
  //     console.log("Failed to purchase product:", error);
  //     // Alert error message
  //     Swal({
  //       title: "Failed!",
  //       text: "Failed to purchase product",
  //       icon: "error",
  //     });
  //   }
  // };
  return (
    <div>
      {selectedItem && (
        <div className={styles.rightnav_cont}>
          <img src={imageUrl} className={styles.resource_img} />
          <div className={styles.text_head}>{selectedItem.productName}</div>
          <div className={styles.text_subhead}>
            Rs.{selectedItem.productPrice}
          </div>
          <div>
            <FaStar className={styles.stars} />
            <FaStar className={styles.stars} />
            <CiStar className={styles.stars} />
            <CiStar className={styles.stars} />
            <CiStar className={styles.stars} />
          </div>
          <div className={styles.resource_details}>
            {selectedItem.productDescription}
          </div>
          <button className={styles.rightnav_btn} onClick={handleAddToCart}>
            Rent
          </button>
        </div>
      )}
    </div>
  );
};

export default RightNav;
