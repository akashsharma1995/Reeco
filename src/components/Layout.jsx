import React from "react";
import styles from "./layout.module.css";
import Navbar from "./Navbar/Navbar";
import OrderSection from "./OrderSection/OrderSection";
import OrderBanner from "./OrderBanner/OrderBanner";

const Layout = () => {
  return (
    <>
      <Navbar></Navbar>
      <OrderBanner />
      <div className={styles["content-wrapper"]}>
        <OrderSection />
      </div>
    </>
  );
};

export default Layout;
