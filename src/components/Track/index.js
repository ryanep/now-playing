import React from "react";
import Background from "../Background";
import Song from "../Song";

export default ({ track }) => (
  <div>
    <Background />
    <Song
      artist={track.item.artists[0].name}
      title={track.item.name}
      artwork={track.item.album.images[0].url}
    />
  </div>
);
