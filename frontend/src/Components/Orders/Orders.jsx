import React from "react";
import styles from "./Orders.module.css";

const Orders = () => {
  return (
    <div>
      <div className={styles.main_cont}>
        <div className={styles.order_row_top}>
          <div className={styles.order_col_1}>
            <table>
              <tr>
                <th>Product </th>
                <th>Item</th>
                <th>Date</th>
                <th>Rent</th>
                <th>Actual Price</th>
                <th>Total</th>
              </tr>
              <tr>
                <td>Basic Mechanical Engineering</td>
                <td>Book</td>
                <td>14-Apr</td>
                <td>1</td>
                <td>50</td>
                <td>50</td>
              </tr>
              <tr>
                <td>Civil Lab Coat</td>
                <td>Coat</td>
                <td>12-Apr</td>
                <td>2</td>
                <td>100</td>
                <td>200</td>
              </tr>
            </table>
          </div>
          <div className={styles.order_col_2}>toprow_right</div>
        </div>
        <div className={styles.order_row_down}>
          <div className={styles.order_col_1}>bottomrow-left</div>
          <div className={styles.order_col_2}>bottomrow-right</div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
