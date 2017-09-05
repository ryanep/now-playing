export const parsePlaylistURI = uri => {
  const parts = uri.split(":");
  if (parts[3] === "playlist") {
    return {
      type: "playlist",
      playlistId: parts[4],
      userId: parts[2]
    };
  } else {
    return {
      type: "unknown"
    };
  }
};
