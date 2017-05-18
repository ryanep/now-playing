export default class TokenService {
  baseUrl = "https://cryptic-ridge-94461.herokuapp.com/";

  getAccessTokenFromCode(code) {
    return fetch(`${this.baseUrl}swap`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `code=${code}`
    })
      .then(response => {
        if (!response.ok) {
          console.log("not okay hun");
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then(response => ({ data: response }))
      .catch(e => ({ error: e }));
  }
}
