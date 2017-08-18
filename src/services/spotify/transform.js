export default (
  {
    is_playing: isPlaying,
    progress_ms: progress,
    duration_ms: duration,
    name: title,
    album: { artists: [{ name: artist }], images: artwork },
    display_name,
    id,
    images
  }
) => ({
  isPlaying,
  progress,
  duration,
  title,
  artist,
  artwork,
  added: {
    name: display_name || id,
    photo: !!images.length && images[0].url
  }
});
