import { React } from "react";
import styles from "./RightNav.module.css";
import Swal from "sweetalert";
import axios from "axios";

const RightNav = ({ selectedItem }) => {
  const userId = sessionStorage.getItem("id");
  const imageUrl = selectedItem
    ? `http://localhost:3000/uploads/${selectedItem.productImage}`
    : null;

  const handleAddToCart = async () => {
    if (!selectedItem) {
      Swal("No product selected!");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/purchaseProduct",
        {
          userId: userId,
          productId: selectedItem._id,
        }
      );

      console.log(response.data);
      Swal({
        title: "Success!",
        text: response.data.message,
        icon: "success",
      });
    } catch (error) {
      console.log("Failed to purchase product:", error);
      Swal({
        title: "Failed!",
        text: "Failed to purchase product",
        icon: "error",
      });
    }
  };

  return (
    <div>
      {selectedItem && (
        <div className={styles.rightnav_cont}>
          <img src={imageUrl} className={styles.resource_img} />
          <div className={styles.text_head}>{selectedItem.productName}</div>
          <div className={styles.text_subhead}>
            Rs.{selectedItem.productPrice}
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
