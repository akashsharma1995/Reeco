import React from "react";
import cartIcon from "../../cartIcon.svg";
import expandIcon from "../../expandIcon.svg";
import styles from "./navbar.module.css";
import { useSelector } from "react-redux";

const Navbar = () => {
  
  const { orderData } = useSelector(state => state.order);
  const productsCount = orderData?.products?.length || 0;

  return (
    <div className={styles.navcontainer}>
      <div className={styles["content-wrapper"]}>
        <div className={styles["navitems-left"]}>
          <div className={`${styles.navitem} ${styles["logo-text"]}`}>
            Reeco
          </div>
          <div className={styles.navitem}>Store</div>
          <div className={styles.navitem}>Order</div>
          <div className={styles.navitem}>Analytics</div>
        </div>
        <div className={styles["navitems-right"]}>
          <div className={styles["cart-container"]}>
            <span className={styles.badge}>{productsCount}</span>
            <img src={cartIcon} alt="cart" height="30px" />
          </div>
          <div className={styles.navitem}>Hello, james <img height="15px" width="20px" src={expandIcon} alt="expand" /></div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
