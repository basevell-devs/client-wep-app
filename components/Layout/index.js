import React from "react";

import styles from "./layout.module.scss";
import Header from "../Header";
import CategoriesBar from "../Categories";

const Layout = ({ children, noCategories }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header />
        <div className={styles.main}>
          {!noCategories && <CategoriesBar />}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
