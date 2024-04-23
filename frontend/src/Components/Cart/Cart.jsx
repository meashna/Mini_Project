import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert";
import axios from "axios";
import styles from "./Cart.module.css";
import emailjs from "emailjs-com";

const Cart = () => {
  const [buyedProducts, setBuyedProducts] = useState([]);
  const userId = sessionStorage.getItem("id");
  const GST_RATE = 0.18;
  const EMAILJS_SERVICE_ID = "service_wm8h07d";
  const EMAILJS_TEMPLATE_ID = "template_ufq689j";
  const EMAILJS_USER_ID = "pJYjKzi1jetO9b2Hk";
  const buyermail = localStorage.getItem("usermail") || "Guest";

  const fetchBuyedProducts = async () => {
    if (userId) {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/userPurchases/${userId}`
        );
        const productsWithQuantity = response.data.map((product) => ({
          ...product,
          quantity: product.quantity || 1,
        }));
        setBuyedProducts(productsWithQuantity);
      } catch (error) {
        console.error("Error fetching buyed products:", error);
        Swal("Error!", "Failed to fetch buyed products.", "error");
      }
    }
  };

  useEffect(() => {
    fetchBuyedProducts();
  }, []);

  const increment = (index) => {
    setBuyedProducts((current) =>
      current.map((item, idx) =>
        idx === index ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrement = (index) => {
    setBuyedProducts((current) =>
      current.map((item, idx) =>
        idx === index && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };
  const deleteProduct = (productId, index) => {
    Swal({
      title: "Are you sure?",
      text: "Do you want to remove this product from your cart?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(
            `http://localhost:3000/api/v1/userPurchases/${userId}/${productId}`
          )
          .then((response) => {
            const updatedProducts = buyedProducts.filter(
              (_, idx) => idx !== index
            );
            setBuyedProducts(updatedProducts);
            Swal("Deleted!", "Your product has been deleted.", "success");
          })
          .catch((error) => {
            console.error("Error deleting the product:", error);
            Swal(
              "Failed to delete!",
              "There was a problem deleting the product.",
              "error"
            );
          });
      }
    });
  };

  const fetchOwnerEmail = async (productId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/products/${productId}/owner-email`
      );
      const ownerEmail = response.data.email;
      console.log("Owner Email:", response.data.email);
      const product = response.data.product;
      console.log(product);
      const productName = product.productName;
      console.log("Product Name", productName);
      console.log("buyermail", buyermail);
      // const totalperproduct = product.quantity * product.product.productPrice;
      //console.log("totalperproduct", totalperproduct);
      const templateParams = {
        from_name: buyermail,
        product_name: productName,
        quantity: 1,
        total_price: total.toFixed(2),
        owner_email: ownerEmail,
        buyer_mail: buyermail,
      };

      emailjs
        .send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams,
          EMAILJS_USER_ID
        )
        .then(
          (response) => {
            console.log(
              "Email successfully sent!",
              response.status,
              response.text
            );

            Swal({
              title: "Email successfully sent!",

              icon: "success",
            });
          },
          //Mail send sucessfully

          (error) => {
            console.error("Failed to send the email:", error);
          }
        );
    } catch (error) {
      console.error("Error fetching owner email:", error);
      Swal("Error!", "Failed to fetch product owner's email.", "error");
    }
  };

  const subtotal = buyedProducts.reduce(
    (acc, curr) =>
      acc + (curr.quantity || 0) * (curr.product?.productPrice ?? 0),
    0
  );

  const GST = subtotal * GST_RATE;
  const total = subtotal + GST;

  return (
    <div className={styles.cart_main}>
      {buyedProducts.length > 0 && (
        <div className={styles.leftmain_cart}>
          {buyedProducts.map((product, index) => (
            <div key={product._id} className={styles.product}>
              <div className={styles.col1}>
                <img
                  src={`http://localhost:3000/uploads/${product.product.productImage}`}
                  className={styles.product_img}
                  alt={product.product.productName}
                />
              </div>
              <div className={styles.col2}>
                <div className={styles.head_name}>
                  <div className={styles.product_name}>
                    {product.product.productName}
                  </div>
                  <div className={styles.total}>
                    Rs. {product.quantity * product.product.productPrice}
                  </div>
                </div>
                <div className={styles.prize}>
                  Rs. {product.product.productPrice} per day
                </div>
                <div className={styles.pro_det}>
                  <div className={styles.more}>
                    <button
                      className={styles.minus_btn}
                      onClick={() => decrement(index)}
                    >
                      -
                    </button>
                    <div className={styles.number}>
                      {product.quantity} Day{product.quantity > 1 ? "s" : ""}
                    </div>
                    <button
                      className={styles.add_btn}
                      onClick={() => increment(index)}
                    >
                      +
                    </button>
                    <MdDelete
                      className={styles.product_icon}
                      onClick={() => deleteProduct(product._id, index)}
                    />
                  </div>
                  <div>
                    <button
                      className={styles.btn_rent}
                      onClick={() => fetchOwnerEmail(product.product._id)}
                    >
                      Send Mail
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={styles.rightmain_cart}>
        <div className={styles.payment_head}>Payment Details</div>
        <div>
          <div className={styles.price_row}>
            <span className={styles.price_label}>Subtotal:</span>
            <div className={styles.price}>
              <span>Rs </span>
              <span className={styles.dynamic_value}>
                {subtotal.toFixed(2)}
              </span>
            </div>
          </div>
          <div className={styles.price_row}>
            <span className={styles.price_label}>GST (18%):</span>
            <div className={styles.price}>
              <span>Rs </span>
              <span className={styles.dynamic_value}>{GST.toFixed(2)}</span>
            </div>
          </div>
          <hr />
          <div className={styles.price_row}>
            <span className={styles.price_label}>Total:</span>
            <div className={styles.price}>
              <span>Rs </span>
              <span className={styles.dynamic_value}>{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div className={styles.deliverymode}>Cash on delivery only</div>
      </div>
    </div>
  );
};

export default Cart;
