import React from "react";
import Background from "../Background";
import Song from "../Song";

export default ({ track }) => (
  <div>
    <Background img={track.artwork[track.artwork.length - 1].url} />
    <Song
      artist={track.artist}
      title={track.title}
      artwork={track.artwork}
      isPlaying={track.isPlaying}
      progress={track.progress}
      duration={track.duration}
    />
  </div>
);