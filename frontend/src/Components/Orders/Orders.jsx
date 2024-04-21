import React from "react";
import styles from "./Orders.module.css";

const Orders = () => {
  return (
    <div>
      <div className={styles.main_cont}>
        <div className={styles.col_1}>
          <div className={styles.top_row}>
            <h1>Hi Ashna</h1>
          </div>
          <div className={styles.btm_row}>Btm</div>
        </div>
        <div className={styles.col_2}>2</div>
      </div>
    </div>
  );
};

export default Orders;
