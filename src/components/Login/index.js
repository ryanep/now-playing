import React from "react";
import queryString from "query-string";

let options = {
  client_id: "4ea54ce3001542bdb54efbff4e75c91b",
  response_type: "code",
  redirect_uri: "http://localhost:3000/cb",
  scope: "user-read-currently-playing user-read-playback-state"
};

export default () => (
  <a
    href={
      `https://accounts.spotify.com/authorize?${queryString.stringify(options)}`
    }
  >
    Login to Spotify
  </a>
);
