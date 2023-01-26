import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { spotifyApiToken } from "./components/spotifyApiToken";

import { Login, PageLoader } from "./pages";

import { Sidebar, MusicPlayer } from "./components";

import {
  ArtistDetails,
  TopArtists,
  Favorites,
  Discover,
  Search,
  SongDetails,
  TopCharts,
  Playlist,
  Album,
  Albums,
} from "./pages";

const App = () => {
  const { activeSong } = useSelector(state => state.player);

  let clientId = import.meta.env.VITE_CLIENT_ID;
  let redirectUri = "https://music-fy.vercel.app/";
  // let redirectUri = "http://localhost:3000/";

  useEffect(() => {
    if (sessionStorage.getItem("refresh_token")) {
      spotifyApiToken.createRefreshToken();
    } else if (!sessionStorage.getItem("refresh_token")) {
      if (window.location.href.includes("code")) {
        const code = window.location.href.split("=")[1];
        spotifyApiToken.createAccessToken(code);
      }
    }
  }, []);

  const handleLogin = () => {
    console.log("Logged in");
    sessionStorage.setItem("isLogged", true);
    window.location.href = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=user-read-private%20user-read-email%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing%20user-top-read%20user-read-recently-played%20user-library-read%20user-library-modify%20playlist-read-private%20playlist-modify-public%20playlist-modify-private%20playlist-read-collaborative%20streaming%20app-remote-control&redirect_uri=${redirectUri}`;
  };

  if (
    sessionStorage.getItem("isLogged") &&
    !sessionStorage.getItem("refresh_token")
  ) {
    return <PageLoader />;
  } else if (
    sessionStorage.getItem("isLogged") &&
    sessionStorage.getItem("refresh_token")
  ) {
    return (
      <div className="relative flex">
        <div>
          <Sidebar className="pb-14" />
        </div>

        <div className={`flex flex-1 flex-col bg-gradient-to-br bg-[#121212]`}>
          <div
            className={` ${
              activeSong?.track?.name
                ? "h-[calc(100vh-120px)]"
                : "h-[calc(100vh-20px)]"
            } overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse w-full`}
          >
            <div className={`h-fit w-full pb-36`}>
              <Routes>
                <Route path="/" element={<Discover />} />
                <Route path="/top-artists" element={<TopArtists />} />
                <Route path="/top-charts" element={<TopCharts />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/artists/:id" element={<ArtistDetails />} />
                <Route path="/playlist/:id" element={<Playlist />} />
                <Route path="/songs/:songid" element={<SongDetails />} />
                <Route path="/search/:searchTerm" element={<Search />} />
                <Route path="/album/:id" element={<Album />} />
                <Route path="/albums" element={<Albums />} />
              </Routes>
            </div>
          </div>
        </div>

        {(activeSong?.track?.name || activeSong?.name) && (
          <div
            className="absolute h-24 bottom-0 left-0 right-0 flex 
          animate-slideup bg-[#181818] backdrop-blur-lg z-10"
          >
            <MusicPlayer />
          </div>
        )}
      </div>
    );
  }
  if (!sessionStorage.getItem("isLogged")) {
    return (
      <div className="relative flex w-full">
        <Routes>
          <Route path="/" element={<Login handleLogin={handleLogin} />} />
        </Routes>
      </div>
    );
  }
};

export default App;
