import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { setIsLibrary } from "../redux/features/topButtons";
import Albums from "./Albums";
import LibraryPlaylists from "./LibraryPlaylists";

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
        <Route path="/albums" element={<Albums />} />
      </Routes>
    </div>
  );
};

export default Library;
