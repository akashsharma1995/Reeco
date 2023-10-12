import React from "react";
import styles from "./button.module.css";

const Button = ({ variant, children, ...otherProps }) => {
  return (
    <button className={`${styles.button} ${styles[variant]}`} {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
