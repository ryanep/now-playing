import React from "react";
import queryString from "query-string";
import styles from './style.scss';

let options = {
  client_id: "4ea54ce3001542bdb54efbff4e75c91b",
  response_type: "code",
  redirect_uri: `${window.location.origin}/cb`,
  scope: "user-read-currently-playing user-read-playback-state"
};

export default () => (
  <a className={styles.button}
    href={
      `https://accounts.spotify.com/authorize?${queryString.stringify(options)}`
    }
  >
    Login to Spotify
  </a>
);
