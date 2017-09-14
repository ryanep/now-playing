import React from "react";
import Background from "../Background";
import Song from "../Song";
import Helmet from "react-helmet";

export default ({ track = null }) =>
  track
    ? <div>
        <Helmet title={"Dis a track"} />
        <Background img={track.artwork[track.artwork.length - 1].url} />
        <Song {...track} />
      </div>
    : <div>
        <Helmet title={"Now Playing"} />
        <p>Play a track to start</p>
      </div>;
