import React, { useState, useEffect } from "react";
import { useCart } from "../../Context/CartContext";
import styles from "./Cart.module.css";
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const { cartItem } = useCart();
  console.log("cart item", cartItem);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(cartItem.map((item) => ({ ...item, count: item.count || 1 })));
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
        newProducts[index] = {
          ...newProducts[index],
          count: newProducts[index].count - 1,
        };
      }
      return newProducts;
    });
  };

  const subtotal = products.reduce(
    (acc, product) => acc + product.productPrice * (product.count || 1),
    0
  );

  const GST = subtotal * 0.05;

  const total = subtotal + GST;

  return (
    <div className={styles.cart_main}>
      <div className={styles.leftmain_cart}>
        {products.map((product, index) => (
          <div key={product._id} className={styles.product}>
            <div className={styles.col1}>
              <img
                src={`http://localhost:3000/uploads/${product.productImage}`}
                className={styles.product_img}
                alt={product.productName}
              />
            </div>
            <div className={styles.col2}>
              <div className={styles.head_name}>
                <div className={styles.product_name}>{product.productName}</div>
                <div className={styles.total}>
                  Rs. {product.productPrice * product.count}
                </div>
              </div>
              <div className={styles.prize}>Rs. {product.productPrice}</div>
              <div className={styles.more}>
                <button
                  className={styles.minus_btn}
                  onClick={() => decrement(index)}
                >
                  -
                </button>
                <div className={styles.number}>{product.count} Days</div>
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
