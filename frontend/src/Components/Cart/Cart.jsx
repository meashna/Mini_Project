import React from "react";
import styles from "./Cart.module.css";
import civil from "../../assets/civil.png";
import { MdDelete } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import coat from "../../assets/coat.png";
import lab from "../../assets/compass.png";

const Cart = () => {
  return (
    <div>
      <div className={styles.cart_main}>
        <div className={styles.leftmain_cart}>
          <div className={styles.product}>
            <div className={styles.col1}>
              <img src={civil} className={styles.product_img}></img>
            </div>
            <div className={styles.col2}>
              <div className={styles.head_name}>
                <div className={styles.product_name}>
                  Basic Mechanical Engineering
                </div>
                <div className={styles.total}>Rs.200</div>
              </div>
              <div className={styles.product_subhead}>J. Benjamin</div>
              <div className={styles.prize}>Rs. 100</div>
              <div className={styles.more}>
                <div className={styles.add_minus}>
                  <button className={styles.minus_btn}>-</button>
                  <div className={styles.number}>2</div>
                  <button className={styles.add_btn}>+</button>
                </div>
                <MdDelete className={styles.product_icon} />
                <IoMdMail className={styles.product_icon} />
              </div>
            </div>
          </div>
          <div className={styles.product}>
            <div className={styles.col1}>
              <img src={coat} className={styles.product_img}></img>
            </div>
            <div className={styles.col2}>
              <div className={styles.head_name}>
                <div className={styles.product_name}>Civil Lab Coat</div>
                <div className={styles.total}>Rs.200</div>
              </div>

              <div className={styles.prize}>Rs. 200</div>
              <div className={styles.more}>
                <div className={styles.add_minus}>
                  <button className={styles.minus_btn}>-</button>
                  <div className={styles.number}>2</div>
                  <button className={styles.add_btn}>+</button>
                </div>
                <MdDelete className={styles.product_icon} />
                <IoMdMail className={styles.product_icon} />
              </div>
            </div>
          </div>
          <div className={styles.product}>
            <div className={styles.col1}>
              <img src={lab} className={styles.product_img}></img>
            </div>
            <div className={styles.col2}>
              <div className={styles.head_name}>
                <div className={styles.product_name}>Mini Drafter</div>
                <div className={styles.total}>Rs.200</div>
              </div>
              <div className={styles.prize}>Rs. 200</div>
              <div className={styles.more}>
                <div className={styles.add_minus}>
                  <button className={styles.minus_btn}>-</button>
                  <div className={styles.number}>2</div>
                  <button className={styles.add_btn}>+</button>
                </div>
                <MdDelete className={styles.product_icon} />
                <IoMdMail className={styles.product_icon} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.rightmain_cart}>
          <div className={styles.payment_head}>Payment Details</div>
          <div>
            <div class={styles.price_row}>
              <span class={styles.price_label}>Subtotal:</span>
              <div class={styles.price}>
                <span>Rs</span>
                <span class={styles.dynamic_value}>450</span>
              </div>
            </div>
            <div class={styles.price_row}>
              <span class={styles.price_label}>Shipping:</span>
              <div class={styles.price}>
                <span>Rs</span>
                <span class={styles.dynamic_value}>40</span>
              </div>
            </div>
            <hr></hr>
            <div class={styles.price_row}>
              <span class={styles.price_label}>Total:</span>
              <div class={styles.price}>
                <span>Rs</span>
                <span class={styles.dynamic_value}>490</span>
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
