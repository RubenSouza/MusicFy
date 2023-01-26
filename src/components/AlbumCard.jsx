import React from "react";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const AlbumCard = ({ song }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <div
        className="flex flex-col w-[200px] h-[285px] p-4 bg-white/5
          backdrop-blur-sm animate-slideup rounded-lg cursor-pointer
          hover:bg-white/10 hover:duration-700 group group-hover:
          "
      >
        <Link to={`/album/${song?.id}`}>
          <div className="relative rounded-lg overflow-hidden">
            <img
              src={song?.images?.[0]?.url}
              alt="songs"
              className="w-full h-full"
            />
          </div>
        </Link>
        <div className="flex flex-col mt-4">
          <Link to={`/album/${song?.id}`}>
            <p className="text-white font-bold truncate text-1xl">
              {song.name}
            </p>
          </Link>
          <p className="text-gray-400 text-sm capitalize mt-1">
            <Link
              to={
                song.artists
                  ? `/artists/${song?.artists[0]?.id}`
                  : "/top-artists"
              }
            >
              {song.artists[0]?.name}
            </Link>
          </p>
        </div>
        {/* 
        <PlayPause
          isPlaying={isPlaying}
          activeSong={activeSong}
          song={song}
          handlePause={handlePauseClick}
          handlePlay={handlePlayClick}
        /> */}
      </div>
    </div>
  );
};

export default AlbumCard;
