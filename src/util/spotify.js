export const parsePlaylistURI = uri => {
  const parts = uri.split(":");
  if (parts[3] === "playlist") {
    return {
      type: "playlist",
      playlistID: parts[4],
      userID: parts[2]
    };
  } else {
    return {
      type: "unknown"
    };
  }
};
