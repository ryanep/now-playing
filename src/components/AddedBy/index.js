import React from "react";
import styles from "./style.scss";

export default ({ name, photo }) => (
  <div className={styles.info}>
    <div className={styles.added}>
      <div className={styles.addedName}>Added by</div>
      <div id="added-by-name" className={styles.name}>{name}</div>
    </div>
    {photo && <img className={styles.photo} src={photo} alt={name} />}
  </div>
);
