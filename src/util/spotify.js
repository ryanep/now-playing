export const parsePlaylistURI = ({ uri = null }) => {
  if (!uri) return { type: "unknown" };
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
