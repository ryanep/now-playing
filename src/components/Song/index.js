import React from "react";
import styles from "./style.scss";

export default ({ title, artist, artwork, added }) => (
  <div className={styles.song}>
    <img src={artwork} className={styles.artwork} alt={title} />
    <div className={styles.track}>
      <h1 className={styles.title}>{title}</h1>
      <h2 className={styles.artist}>{artist}</h2>
    </div>
    {added &&
      <div className={styles.info}>
        <img
          className={styles.photo}
          src={added && added.photo}
          alt={added.name}
        />
        <div className={styles.added}>
          <div className={styles.addedName}>Added by</div>
          <div className={styles.name}>{added && added.name}</div>
        </div>
      </div>}
  </div>
);
