import React from "react";
import Progress from "../Progress";
import Visualiser from "../Visualiser";
import AddedBy from "../AddedBy";
import ProgressiveImage from "react-progressive-image";
import styles from "./style.scss";

export default ({ title, artist, artwork, added, isPlaying, progress, duration }) => (
  <div className={styles.song}>
    <div className={styles.album}>
      <ProgressiveImage src={artwork[0].url} placeholder={artwork[artwork.length - 1].url}>
        {src => <img src={src} alt={`${artist} - ${title}`} className={styles.artwork} />}
      </ProgressiveImage>
      <div className={styles.track}>
          <h1 className={styles.title}>{title}</h1>
        <div className={styles.trackInfo}>
          <h2 className={styles.artist}>{artist}</h2>
          {added && <AddedBy {...added} />}
        </div>
      </div>
      <Progress isPlaying={isPlaying} progress={progress} duration={duration} />
      <Visualiser isPlaying={isPlaying} />
    </div>
  </div>
);
