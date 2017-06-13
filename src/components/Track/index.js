import React from "react";
import Background from "../Background";
import Song from "../Song";

export default ({ track }) => (
  <div>
    <Background img={track.item.album.images[track.item.album.images.length - 1].url} />
    <Song
      artist={track.item.artists[0].name}
      title={track.item.name}
      artwork={track.item.album.images}
    />
  </div>
);