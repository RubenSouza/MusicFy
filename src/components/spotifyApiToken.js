let clientId = import.meta.env.VITE_CLIENT_ID;
let clientSecret = import.meta.env.VITE_CLIENT_SECRET;
let redirectUri = import.meta.env.VITE_REDIRECT_URI;

export const spotifyApiToken = {
  createAccessToken: async code => {
    let response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
      },
      body: `grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}`,
    })
      .then(res => res.json())
      .then(data => {
        sessionStorage.setItem("token", data.access_token);
        sessionStorage.setItem("refresh_token", data.refresh_token);
        sessionStorage.setItem("expires_in", data.expires_in);
      });

    setTimeout(() => {
      spotifyApiToken.createRefreshToken();
    }, sessionStorage.getItem("expires_in") * 1000);

    return response;
  },

  createRefreshToken: async () => {
    let response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
      },
      body: `grant_type=refresh_token&refresh_token=${sessionStorage.getItem(
        "refresh_token"
      )}`,
    })
      .then(res => res.json())
      .then(data => {
        sessionStorage.setItem("token", data.access_token);
        sessionStorage.setItem("expires_in", data.expires_in);
      });

    setTimeout(() => {
      spotifyApiToken.createRefreshToken();
    }, sessionStorage.getItem("expires_in") * 1000);

    return response;
  },

  // getUserProfile: async () => {
  //   let response = await fetch("https://api.spotify.com/v1/me", {
  //     method: "GET",
  //     headers: {
  //       Authorization: "Bearer " + localStorage.getItem("token"),
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       return data;
  //     });
  //   return response;
  // },
  // getUserPlaylists: async () => {
  //   let response = fetch("https://api.spotify.com/v1/me/playlists?limit=50", {
  //     method: "GET",
  //     headers: {
  //       Authorization: "Bearer " + localStorage.getItem("token"),
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       return data;
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });

  //   return response;
  // },
  // getUserTopItems: async () => {
  //   let response = await fetch("https://api.spotify.com/v1/me/top/artists", {
  //     method: "GET",
  //     headers: {
  //       Authorization: "Bearer " + localStorage.getItem("token"),
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log(data);
  //     });

  //   return response;
  // },
};
