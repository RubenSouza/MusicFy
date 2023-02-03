import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { spotifyApiToken } from "./components/spotifyApiToken";

import { Login, PageLoader } from "./pages";

import { Sidebar, MusicPlayer, TopButtons } from "./components";

import {
  ArtistDetails,
  Library,
  Favorites,
  Discover,
  Search,
  SongDetails,
  TopCharts,
  Playlist,
  Album,
  Albums,
  Featured,
  TopTracks,
  TopBrasil,
} from "./pages";
import ArtistAlbums from "./pages/ArtistAlbums";

const App = () => {
  const { activeSong } = useSelector(state => state.player);

  let clientId = import.meta.env.VITE_CLIENT_ID;
  let redirectUri = import.meta.env.VITE_REDIRECT_URI;

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
      <div className="relative flex h-screen ">
        <div>
          <Sidebar className="pb-14" />
        </div>

        <div
          className={`flex flex-1 flex-col bg-gradient-to-br bg-[#121212] 
          `}
          id="main"
        >
          <div className="z-20 absolute w-full" id="topButtons">
            <TopButtons />
          </div>

          <div
            className={`flex xl:flex-row overflow-y-scroll scrollbar-none w-full ${
              activeSong?.track?.name || activeSong?.name
                ? "h-[calc(100vh-120px)]"
                : "h-[calc(100vh-20px)]"
            }`}
          >
            <div className={`h-fit w-full pb-36`}>
              <Routes>
                <Route path="/" element={<Discover />} />
                <Route path="/library/*" element={<Library />} />
                <Route path="/top-charts" element={<TopCharts />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/artists/:id" element={<ArtistDetails />} />
                <Route path="/artists/albums/:id" element={<ArtistAlbums />} />
                <Route path="/playlist/:id" element={<Playlist />} />
                <Route path="/songs/:id" element={<SongDetails />} />
                <Route path="/search/:searchTerm" element={<Search />} />
                <Route path="/album/:id" element={<Album />} />
                <Route path="/albums" element={<Albums />} />
                <Route path="/featured" element={<Featured />} />
                <Route path="/topTracks" element={<TopTracks />} />
                <Route path="/topBrasil" element={<TopBrasil />} />
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
