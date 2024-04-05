import React, { useState, useEffect } from "react";
import { useCart } from "../../Context/CartContext"; // Adjust the import path as necessary
import styles from "./Cart.module.css";
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const { cartItem } = useCart();
  // Initialize a local state with the cartItem array from context
  const [products, setProducts] = useState([]);

  // Update local products state whenever cartItem changes
  useEffect(() => {
    setProducts(cartItem.map((item) => ({ ...item, count: item.count || 1 }))); // Ensure each item has a count
  }, [cartItem]);

  const increment = (index) => {
    setProducts((prevProducts) => {
      const newProducts = [...prevProducts];
      newProducts[index] = {
        ...newProducts[index],
        count: newProducts[index].count + 1,
      };
      return newProducts;
    });
  };

  const decrement = (index) => {
    setProducts((prevProducts) => {
      const newProducts = [...prevProducts];
      if (newProducts[index].count > 1) {
        // Prevent count from going below 1
        newProducts[index] = {
          ...newProducts[index],
          count: newProducts[index].count - 1,
        };
      }
      return newProducts;
    });
  };

  // Calculate Subtotal
  const subtotal = products.reduce(
    (acc, item) => acc + item.price * (item.count || 1),
    0
  );

  // Assume GST is a fixed percentage of the subtotal, say 5%
  const GST = subtotal * 0.05;

  // Total amount
  const total = subtotal + GST;

  return (
    <div className={styles.cart_main}>
      {/* Cart items */}
      <div className={styles.leftmain_cart}>
        {products.map((item, index) => (
          <div key={item.id || index} className={styles.product}>
            <div className={styles.col1}>
              <img
                src={item.image}
                className={styles.product_img}
                alt={item.name}
              />
            </div>
            <div className={styles.col2}>
              <div className={styles.head_name}>
                <div className={styles.product_name}>{item.name}</div>
                <div className={styles.total}>
                  Rs. {item.price * item.count}
                </div>
              </div>
              <div className={styles.prize}>Rs. {item.price}</div>
              <div className={styles.more}>
                <button
                  className={styles.minus_btn}
                  onClick={() => decrement(index)}
                >
                  -
                </button>
                <div className={styles.number}>{item.count} Days</div>
                <button
                  className={styles.add_btn}
                  onClick={() => increment(index)}
                >
                  +
                </button>
                <MdDelete className={styles.product_icon} />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Payment Details */}
      <div className={styles.rightmain_cart}>
        <div className={styles.payment_head}>Payment Details</div>
        <div>
          <div className={styles.price_row}>
            <span className={styles.price_label}>Subtotal:</span>
            <div className={styles.price}>
              <span>Rs</span>
              <span className={styles.dynamic_value}>
                {subtotal.toFixed(2)} {/* Formats to two decimal places */}
              </span>
            </div>
          </div>
          <div className={styles.price_row}>
            <span className={styles.price_label}>GST :</span>
            <div className={styles.price}>
              <span>Rs</span>
              <span className={styles.dynamic_value}>{GST.toFixed(2)}</span>
            </div>
          </div>
          <hr></hr>
          <div className={styles.price_row}>
            <span className={styles.price_label}>Total:</span>
            <div className={styles.price}>
              <span>Rs</span>
              <span className={styles.dynamic_value}>{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div className={styles.deliverymode}>Cash on delivery only</div>
        <div className={styles.rent}>
          <button className={styles.btn_rent}>Rent</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
