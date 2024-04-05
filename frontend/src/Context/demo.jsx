import React, { useState } from "react";
import styles from "./Cart.module.css";
import civil from "../../assets/civil.png";
import { MdDelete } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import coat from "../../assets/coat.png";
import lab from "../../assets/compass.png";

const Cart = () => {
  const [products, setProducts] = useState([
    { name: "Basic Mechanical Engineering", price: 10, count: 0 },
    { name: "Civil Lab Coat", price: 50, count: 0 },
    { name: "Mini Drafter", price: 10, count: 0 },
  ]);

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
      if (newProducts[index].count > 0) {
        newProducts[index] = {
          ...newProducts[index],
          count: newProducts[index].count - 1,
        };
      }
      return newProducts;
    });
  };

  return (
    <div>
      <div className={styles.cart_main}>
        <div className={styles.leftmain_cart}>
          {products.map((product, index) => (
            <div key={index} className={styles.product}>
              <div className={styles.col1}>
                <img
                  src={index === 0 ? civil : index === 1 ? coat : lab}
                  className={styles.product_img}
                  alt={product.name}
                ></img>
              </div>
              <div className={styles.col2}>
                <div className={styles.head_name}>
                  <div className={styles.product_name}>{product.name}</div>
                  <div className={styles.total}>
                    Rs.{product.price * product.count}
                  </div>
                </div>
                <div className={styles.product_subhead}>J. Benjamin</div>
                <div className={styles.prize}>Rs. {product.price}</div>
                <div className={styles.more}>
                  <div className={styles.add_minus}>
                    <button
                      className={styles.minus_btn}
                      onClick={() => decrement(index)}
                    >
                      -
                    </button>
                    <div className={styles.number}>{product.count}</div>
                    <button
                      className={styles.add_btn}
                      onClick={() => increment(index)}
                    >
                      +
                    </button>
                  </div>
                  <div className={styles.days}> Days</div>
                  <MdDelete className={styles.product_icon} />
                  {/* <IoMdMail className={styles.product_icon} /> */}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.rightmain_cart}>
          <div className={styles.payment_head}>Payment Details</div>
          <div>
            <div className={styles.price_row}>
              <span className={styles.price_label}>Subtotal:</span>
              <div className={styles.price}>
                <span>Rs</span>
                <span className={styles.dynamic_value}>
                  {products.reduce(
                    (total, product) => total + product.price * product.count,
                    0
                  )}
                </span>
              </div>
            </div>
            <div className={styles.price_row}>
              <span className={styles.price_label}>GST :</span>
              <div className={styles.price}>
                <span>Rs</span>
                <span className={styles.dynamic_value}>3</span>
              </div>
            </div>
            <hr></hr>
            <div className={styles.price_row}>
              <span className={styles.price_label}>Total:</span>
              <div className={styles.price}>
                <span>Rs</span>
                <span className={styles.dynamic_value}>
                  {products.reduce(
                    (total, product) => total + product.price * product.count,
                    0
                  ) + 3}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.deliverymode}>Cash on delivery only</div>
          <div className={styles.rent}>
            <button className={styles.btn_rent}>Rent</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
