import React from "react";
import styles from "./orderBanner.module.css";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../../utils/common";
import Button from "../Button/Button";
import { approveOrder } from "../../redux/slice/orderSlice";

const OrderBanner = () => {
  const { orderData } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  if (isEmpty(orderData)) {
    return;
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.breadcrumb}>
          Orders<span className={styles["forward-icon"]}>&#10095;</span>
          <span>{orderData.orderId}</span>
        </div>
        <div className={styles.main}>
          <div className={styles["main-left"]}>
            <h2 className={styles["order-heading"]}>
              Order &nbsp; {orderData.orderId}
            </h2>
          </div>
          <div className={styles["main-right"]}>
            <Button variant="outlined">Back</Button>
            {orderData.approved ? (
              <h3 className={styles.status}>Approved &#10004;</h3>
            ) : (
              <Button variant="solid" onClick={() => dispatch(approveOrder())}>
                Approve Order
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderBanner;
