import { SPOTIFY_REFRESH_TOKEN } from "../constants/storage-keys";

const baseUrl = "https://cryptic-ridge-94461.herokuapp.com";

export async function getAccessTokenFromCode(code) {
  const response = await fetch(`${this.baseUrl}/swap`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `code=${code}`
  });
  return response.json();
}

export async function getAccessTokenFromRefreshToken() {
  let refreshToken = localStorage.getItem(SPOTIFY_REFRESH_TOKEN);
  const response = await fetch(`${this.baseUrl}/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `refresh_token=${refreshToken}`
  });
  return response.json();
}
