import React from "react";
import Progress from "../Progress";
import Visualiser from "../Visualiser";
import ProgressiveImage from 'react-progressive-image';
import styles from "./style.scss";

export default ({ title, artist, artwork, added }) => (
  <div className={styles.song}>
    <div className={styles.album}>
      <ProgressiveImage src={artwork[0].url} placeholder={artwork[artwork.length - 1].url}>
        {(src) => <img src={src} alt={`${artist} - ${title}`} className={styles.artwork} />}
      </ProgressiveImage>
      <div className={styles.track}>
        <h1 className={styles.title}>{title}</h1>
        <h2 className={styles.artist}>{artist}</h2>
      </div>
      <Progress />
      <Visualiser />
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
