import React, { useEffect, useState } from "react";
import Modal from "../../Modal/Modal";
import styles from "./editModal.module.css";
import Button from "../../Button/Button";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../../redux/slice/orderSlice";

const EditModal = ({ activeProduct, handleClose }) => {
  const dispatch = useDispatch();
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);

  const handleSubmit = () => {
    dispatch(
      updateProduct({
        productId: activeProduct.id,
        quantity: quantity || 0,
        price: price || 0,
        total,
      })
    );
    handleClose();
  };
  useEffect(() => {
    initializeLocalStates();
  }, []);

  const initializeLocalStates = () => {
    setPrice(activeProduct.price);
    setQuantity(activeProduct.quantity);
    setTotal(activeProduct.total);
  };

  useEffect(() => {
    setTotal(price * quantity);
  }, [price, quantity]);

  const handleChange = (value, cb) => {
    const re = /^[0-9\b]+$/;
    if (value === "" || re.test(value)) {
      cb(value);
    }
  };

  return (
    <Modal title={activeProduct.name} handleClose={handleClose}>
      <span className={styles.brand}>{activeProduct.brand}</span>
      <div className={styles.grid}>
        <div>
          <img src={activeProduct.img} alt="product" height={100} width={100} />
        </div>
        <div>
          <table className={styles.table}>
            <tbody>
              <tr>
                <td>{`Price ($)`}</td>
                <td className={styles.td}>
                  <input
                    className={styles.input}
                    value={price}
                    onChange={(e) => handleChange(e.target.value, setPrice)}
                  />
                </td>
              </tr>
              <tr>
                <td>Quantity</td>
                <td className={styles.td}>
                  <span
                    onClick={() =>
                      setQuantity((value) => (value && value - 1) || 0)
                    }
                    className={styles["qty-buttons"]}
                  >
                    &#9866;
                  </span>
                  <input
                    className={`${styles.input} ${styles["quantity-input"]}`}
                    value={quantity}
                    onChange={(e) => handleChange(e.target.value, setQuantity)}
                  />
                  <span
                    onClick={() => setQuantity((value) => value + 1)}
                    className={styles["qty-buttons"]}
                  >
                    &#10010;
                  </span>
                </td>
              </tr>
              <tr>
                <td>Total</td>
                <td className={styles.td}><b>$</b>{total}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.buttons}>
        <Button variant="outlined" onClick={() => handleClose()}>
          Cancel
        </Button>
        <Button variant="solid" onClick={() => handleSubmit()}>
          Send
        </Button>
      </div>
    </Modal>
  );
};

export default EditModal;
