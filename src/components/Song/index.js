import React from "react";
import Progress from "../Progress";
import Visualiser from "../Visualiser";
import ProgressiveImage from 'react-progressive-image';
import styles from "./style.scss";

export default ({ track }) => (
  <div className={styles.song}>
    <div className={styles.album}>
      <ProgressiveImage src={track.artwork[0].url} placeholder={track.artwork[track.artwork.length - 1].url}>
        {(src) => <img src={src} alt={`${track.artist} - ${track.title}`} className={styles.artwork} />}
      </ProgressiveImage>
      <div className={styles.track}>
        <h1 className={styles.title}>{track.title}</h1>
        <h2 className={styles.artist}>{track.artist}</h2>
      </div>
      <Progress isPlaying={track.isPlaying} progress={track.progress} duration={track.duration} />
      <Visualiser isPlaying={track.isPlaying} />
    </div>
    {track.added &&
      <div className={styles.info}>
        <img
          className={styles.photo}
          src={track.added && track.added.photo}
          alt={track.added.name}
        />
          <div className={styles.addedName}>Added by</div>
        <div className={styles.added}>
          <div className={styles.name}>{track.added && track.added.name}</div>
        </div>
      </div>}
  </div>
);
