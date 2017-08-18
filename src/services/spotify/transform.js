import nn from "nevernull";

export default (
  {
    is_playing: isPlaying,
    progress_ms: progress,
    duration_ms: duration,
    name: title,
    album: { artists: [{ name }], images: artwork },
    user
  }
) => ({
  isPlaying,
  progress,
  duration,
  title,
  name,
  artwork,
  added: {
    name: nn(user).display_name() || nn(user).id(),
    photo: nn(user).images[0].url()
  }
});
