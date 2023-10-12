import React, { useState } from "react";
import styles from "./productstable.module.css";
import { updateStatus } from "../../redux/slice/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../../utils/common";
import { MissingModal } from "../Modals/MissingModal/MissingModal";
import EditModal from "../Modals/EditModal/EditModal";

const headers = [
  "",
  "Product Name",
  "Brand",
  "Price",
  "Quantity",
  "Total",
  "Status",
  "",
  "",
  "",
];

const ProductsTable = () => {
  const dispatch = useDispatch();
  const { orderData } = useSelector((state) => state.order);
  const [isMissingModalOpen, setIsMissingModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState("");

  if (isEmpty(orderData)) {
    return;
  }

  const handleApprove = (productId) => {
    dispatch(
      updateStatus({
        productId,
        status: "Approved",
      })
    );
  };

  const products = orderData.products || [];

  const handleCloseMissingModal = () => {
    setIsMissingModalOpen(false);
    setActiveProduct("");
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setActiveProduct("");
  };

  const AreCtaButtonsDisabled = () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0); 
    return orderData.approved || new Date() > new Date(orderData.shippingDate)
  }

  const disableCtaButton = AreCtaButtonsDisabled();

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr className={styles["header-row"]}>
            {headers.map((item, i) => {
              return (
                <td key={item + i} className={styles["header-datacell"]}>
                  {item}
                </td>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {products.map((product, i) => {
            return (
              <tr className={styles["body-row"]} key={product.id}>
                <td className={`${styles["body-datacell"]} ${styles["img-cell"]}`}>
                  <img src={product?.img} height="70px" width="70px" />
                </td>
                <td className={styles["body-datacell"]}>{product?.name}</td>
                <td className={styles["body-datacell"]}>{product?.brand}</td>
                <td className={styles["body-datacell"]}>
                  {product?.currency}
                  {product?.price}
                  {product?.unit}
                </td>
                <td className={`${styles["body-datacell"]} ${styles["qty-cell"]}`}>
                  {product?.quantity}
                </td>
                <td className={styles["body-datacell"]}>
                  {product?.currency}
                  {product?.total}
                </td>
                <td
                  className={`${styles["body-datacell"]} ${styles["status-datacell"]}`}
                >
                  {product?.status && (
                    <span
                      className={`${styles["status-badge"]} ${
                        styles[
                          product.status.toLocaleLowerCase() === "missing" ||
                          product.status.toLocaleLowerCase() ===
                            "missing-urgent"
                            ? product.status.toLocaleLowerCase()
                            : "approved"
                        ]
                      }`}
                    >
                      {product.status}
                    </span>
                  )}
                </td>
                <td
                  className={`${styles["body-datacell"]} ${styles["approve-datacell"]}`}
                >
                  <span
                    className={`${styles["cta-btn"]} ${
                      disableCtaButton && styles.disabled
                    }`}
                    onClick={() => handleApprove(product.id)}
                  >
                    &#10004;
                  </span>
                </td>
                <td
                  className={`${styles["body-datacell"]} ${styles["reject-datacell"]}`}
                >
                  <span
                    className={`${styles["cta-btn"]} ${
                      disableCtaButton && styles.disabled
                    }`}
                    onClick={() => {
                      setActiveProduct(product);
                      setIsMissingModalOpen(true);
                    }}
                  >
                    &#10005;
                  </span>
                </td>
                <td
                  className={`${styles["body-datacell"]} ${styles["edit-datacell"]}`}
                  onClick={() => {
                    setIsEditModalOpen(true);
                    setActiveProduct(product);
                  }}
                >
                  <span
                    className={`${styles["cta-btn"]} ${
                      disableCtaButton && styles.disabled
                    }`}
                  >
                    Edit
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {isMissingModalOpen && (
        <MissingModal
          handleClose={handleCloseMissingModal}
          activeProduct={activeProduct}
        />
      )}
      {isEditModalOpen && (
        <EditModal
          handleClose={handleCloseEditModal}
          activeProduct={activeProduct}
        />
      )}
    </div>
  );
};

export default ProductsTable;
