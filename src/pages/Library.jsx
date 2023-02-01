import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { setIsLibrary } from "../redux/features/topButtons";
import Albums from "./Albums";
import LibraryAlbums from "./LibraryAlbums";
import LibraryPlaylists from "./LibraryPlaylists";
import LibraryPodcasts from "./LibraryPodcasts";

const Library = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsLibrary(true));

    return () => {
      dispatch(setIsLibrary(false));
    };
  }, []);

  return (
    <div className="h-screen text-white">
      <Routes>
        <Route path="/" element={<LibraryPlaylists />} />
        <Route path="/podcasts" element={<LibraryPodcasts />} />
        <Route path="/albums" element={<LibraryAlbums />} />
      </Routes>
    </div>
  );
};

export default Library;
