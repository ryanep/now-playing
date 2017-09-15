import React, { Component } from "react";
import styles from "./style.scss";

export default ({ img }) => (
  <div className={styles.container}>
    <img src={img} className={styles.image} alt="" />
  </div>
);
