import React from "react";
import styles from "./products.module.css";
import Button from "../Button/Button";
import Searchbar from "../SearchBar/Searchbar";
import printIcon from "../../printIcon.svg";
import ProductsTable from "./ProductsTable";

const Products = () => {
  return (
    <div className={styles.container}>
      <div className={styles["top-section"]}>
        <div className={styles["search-container"]}>
          <Searchbar />
        </div>
        <div className={styles["cta-btns-container"]}>
          <Button variant="outlined">Add Item</Button>
          <img src={printIcon} alt="print" height="35px" />
        </div>
      </div>
      {/* Table */}
      <ProductsTable/>
    </div>
  );
};

export default Products;
