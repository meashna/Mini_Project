import React from "react";
import styles from "./SideNav.module.css";
import { AiFillHome } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { IoLogOutSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const SideNav = ({ changeView, currentView }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className={styles.sidenav_items}>
        <div onClick={changeView("recomm")}>
          <AiFillHome
            className={
              currentView === "recomm"
                ? styles.active_icon
                : styles.sidenav_icons
            }
          />
        </div>
        <div onClick={changeView("cart")}>
          <FaShoppingCart
            className={
              currentView === "cart" ? styles.active_icon : styles.sidenav_icons
            }
          />
        </div>
        <div onClick={changeView("orders")}>
          <IoIosSend
            className={
              currentView === "orders"
                ? styles.active_icon
                : styles.sidenav_icons
            }
          />
        </div>
        <div>
          <IoLogOutSharp
            className={styles.sidenav_icons}
            onClick={() => navigate("/signin")}
          />
        </div>
      </div>
    </div>
  );
};

export default SideNav;
