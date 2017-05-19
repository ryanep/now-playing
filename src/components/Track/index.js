import React from "react";
import Background from "../Background";
import Song from "../Song";

export default props => (
  <div>
    <Background />
    <Song
      artist={"Example Artist"}
      title={"Example Title"}
      artwork={
        "https://i.scdn.co/image/49535e5c509f9a1f48a034f19d48a89b22872b29"
      }
    />
  </div>
);
