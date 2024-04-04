import React, { useState } from "react";
import styles from "./Home.module.css";
import SideNav from "../../Components/SideNav/SideNav";
import TopNav from "../../Components/TopNav/TopNav";
// import RightNav from "../../Components/RightNav/RightNav";
import Recomm from "../../Components/Recomm/Recomm";
import Cart from "../../Components/Cart/Cart";
import Orders from "../../Components/Orders/Orders";

const Home = () => {
  const [currentView, setCurrentView] = useState("recomm");
  const changeView = (view) => () => {
    setCurrentView(view);
  };
  const renderComponent = () => {
    switch (currentView) {
      case "cart":
        return <Cart />;
      case "orders":
        return <Orders />;
      default:
        return <Recomm />;
    }
  };
  return (
    <div>
      <div class={styles.dashboard}>
        <div class={styles.sidenav}>
          {/* <SideNav changeView={changeView} /> */}
          <SideNav changeView={changeView} currentView={currentView} />
        </div>
        <div class={styles.main}>
          <div class={styles.toprow}>
            <TopNav />
          </div>
          <div class={styles.home_bottomrow}>
            <div>{renderComponent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
