//////////////////////////////////////////////////////////////////////
//                             Encryption                           //
//////////////////////////////////////////////////////////////////////

const clientId = "2af4fbb025d541898fb163e490aeec27"; // Replace with your client ID
const clientSecret = "b70414b150024d53bd68f8e2fece810f";
const redirect_uri = "http://localhost:5173/callback";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

async function spotifyLogin() {
  if (!code) {
    redirectToAuthCodeFlow(clientId);
  } else {
    const accessToken = await getAccessToken();
  }
}

async function getAccessToken() {
  const verifier = localStorage.getItem("verifier");

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("client_secret", clientSecret);

  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", redirect_uri);
  params.append("code_verifier", verifier);

  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  const { access_token, token_type, scope, expires_in, refresh_token } =
    await result.json();

  console.log(access_token);
  var expires = new Date();
  expires.setSeconds(expires.getSeconds() + expires_in);

  localStorage.setItem("access_token", access_token);
  localStorage.setItem("expires_at", expires);
  localStorage.setItem("refresh_token", refresh_token);
  return access_token;
}
var currentTime = new Date();

async function refreshToken() {
  //add refresh check to every page? or every api call

  if (!localStorage.getItem("expires_at")) {
    return;
  }

  if (localStorage.getItem("expires_at") > currentTime) {
    return;
  }
  const verifier = localStorage.getItem("verifier");

  const params = new URLSearchParams();
  params.append("grant_type", "refresh_token");
  params.append("refresh_token", localStorage.getItem("refresh_token"));
  params.append("client_id", clientId);
  params.append("client_secret", clientSecret);

  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  const { access_token, token_type, scope, expires_in, refresh_token } =
    await result.json();

  var expires = new Date();
  expires.setSeconds(expires.getSeconds() + expires_in);

  localStorage.setItem("access_token", access_token);
  localStorage.setItem("expires_at", expires);
  localStorage.setItem("refresh_token", refresh_token);
  return access_token;
}

function populateUI(profile) {
  // TODO: Update UI with profile data
}

async function redirectToAuthCodeFlow(clientId) {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem("verifier", verifier);

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("response_type", "code");
  params.append("redirect_uri", redirect_uri);
  params.append("scope", "user-read-private user-read-email");
  params.append("code_challenge_method", "S256");
  params.append("code_challenge", challenge);

  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

//////////////////////////////////////////////////////////////////////
//                             Requests                             //
//////////////////////////////////////////////////////////////////////

async function getGenres() {
  refreshToken();
  var token = localStorage.getItem("access_token");
  try {
    const result = await fetch(
      "https://api.spotify.com/v1/recommendations/available-genre-seeds",
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    var res = await result.json();
    return res;
  } catch {
    console.log("Failed to retrieve genres");
    return [];
  }
}

async function generateAlbum(playlistGenres, playlistTitle) {
  refreshToken();
  var token = localStorage.getItem("access_token");
  var genres = playlistGenres.join(",");
  var songIDS = [];

  console.log(genres);
  console.log(playlistTitle);
  try {
    // const params = new URLSearchParams();
    // params.append("min_popularity", 70);
    // params.append("seed_genres", genres);
    // params.append("limit", 30);
    // params.append("market", "US");

    const result = await fetch(
      `https://api.spotify.com/v1/recommendations?min_popularity=70&seed_genres=${genres}&limit=30&market=US`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    var res = await result.json();
    console.log(res);
  } catch (e) {
    console.log(e);
    console.log("Failed to retreive recommended songs");
    return;
  }
}

export {
  redirectToAuthCodeFlow,
  getAccessToken,
  spotifyLogin,
  getGenres,
  generateAlbum,
};
