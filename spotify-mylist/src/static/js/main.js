//////////////////////////////////////////////////////////////////////
//                        Event Listeners                           //
//////////////////////////////////////////////////////////////////////
const loginButton = document.querySelector("#login");
const logoutButton = document.querySelector("#logout");

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
  location.reload();
  return access_token;
}

async function refreshToken() {
  //add refresh check to every page? or every api call
  var currentTime = new Date();

  if (!localStorage.getItem("expires_at")) {
    return;
  }
  var expTime = new Date(localStorage.getItem("expires_at"));
  if (expTime > currentTime) {
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

async function redirectToAuthCodeFlow(clientId) {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem("verifier", verifier);

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("response_type", "code");
  params.append("redirect_uri", redirect_uri);
  params.append(
    "scope",
    "playlist-modify-public playlist-modify-private user-read-private user-read-email ugc-image-upload user-top-read"
  );
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

async function getUserID() {
  refreshToken();
  var token = localStorage.getItem("access_token");
  try {
    const result = await fetch(`https://api.spotify.com/v1/me`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    var { id } = await result.json();
    return id;
  } catch (e) {
    console.log(e);
    console.log("Failed to fetch user ID");
  }
}

async function generateAlbum(playlistGenres, playlistTitle, imagePath) {
  await refreshToken();
  var token = localStorage.getItem("access_token");
  var genres = playlistGenres.join(",");
  var songIDS = [];
  var userID = await getUserID();
  var playlistID;
  var playlistURI;
  console.log(userID);

  try {
    const result = await fetch(
      `https://api.spotify.com/v1/recommendations?min_popularity=30&seed_genres=${genres}&limit=30&market=US`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    var { tracks } = await result.json();
    for (let i = 0; i < tracks.length; i++) {
      songIDS.push(tracks[i].uri);
    }
  } catch (e) {
    console.log(e);
    console.log("Failed to retreive recommended songs");
    return;
  }

  try {
    refreshToken();

    const result = await fetch(
      `https://api.spotify.com/v1/users/${userID}/playlists`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          name: playlistTitle,
          description: `Your custom MyList with genres: ${playlistGenres.join(
            ", "
          )}`,
          public: false,
        }),
      }
    );
    var { id, uri } = await result.json();
    playlistID = id;
    playlistURI = uri;
    console.log("Playlist has been created");
  } catch (e) {
    console.log(e);
    console.log("Failed to create playlist");
    return;
  }

  try {
    refreshToken();
    console.log(songIDS);
    const result = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          uris: songIDS,
        }),
      }
    );
    console.log("Songs added...");
  } catch (e) {
    console.log(e);
    console.log("Failed to add songs to playlist");
    return;
  }

  try {
    var encodedImage;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", imagePath, true);
    xhr.responseType = "blob";
    xhr.onload = function (e) {
      encodedImage = this.response;
      var reader = new FileReader();
      reader.onload = async function (event) {
        var res = event.target.result;
        encodedImage = res;
        encodedImage = encodedImage.split("data:image/png;base64,")[1];
        console.log(encodedImage);
        try {
          refreshToken();
          const result = await fetch(
            `https://api.spotify.com/v1/playlists/${playlistID}/images`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "image/jpeg",
              },
              body: encodedImage,
            }
          );
          console.log(result);
          console.log("Image uploaded...");
        } catch (e) {
          console.log(e);
          console.log("Image could not be uploaded");
        }
      };
      var file = this.response;
      reader.readAsDataURL(file);
    };
    xhr.send();
  } catch (e) {
    console.log(e);
    console.log("Failed encode image");
  }
  console.log("hit");
  return playlistURI;
}

async function getTopTracks(timeRange="medium_term") {
  await refreshToken();
  var token = localStorage.getItem("access_token");
  try {
    const result = await fetch(
      `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=10`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    var { items } = await result.json();
    console.log(timeRange + " Tracks retrieved...");
    console.log(items);
    return items;
  } catch (e) {
    console.log(e);
    console.log("Failed to retreive top tracks...");
  }
}

async function getTopArtists(timeRange="medium_term") {
  await refreshToken();
  var token = localStorage.getItem("access_token");

  try {
    const result = await fetch(
      `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=10`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    var { items } = await result.json();
    console.log(timeRange + " Artists retrieved...");
    console.log(items);

    return items;
  } catch (e) {
    console.log(e);
    console.log("Failed to retreive top artists...");
  }
}

export {
  redirectToAuthCodeFlow,
  getAccessToken,
  spotifyLogin,
  getGenres,
  generateAlbum,
  getTopTracks,
  getTopArtists,
};
