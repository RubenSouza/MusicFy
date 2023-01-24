import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PlayIcon, PauseIcon } from "@heroicons/react/24/solid";

const PlayRelatedSongs = ({
  isPlaying,
  activeSong,
  song,
  handlePause,
  handlePlay,
}) =>
  isPlaying && activeSong?.title === song.title ? (
    <PauseIcon className="text-gray-300 h-6" onClick={handlePause} />
  ) : (
    <PlayIcon className="text-gray-300 h-5" onClick={handlePlay} />
  );

const SongBar = ({
  song,
  i,
  artistId,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`w-full flex flex-row items-center hover:bg-[#313131]/50 ${
        activeSong?.title === song?.title ? "bg-[#313131]/50" : "bg-transparent"
      } py-2 p-4 pl-6 rounded-lg cursor-pointer mb-2`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="pr-3">
        {isHovered ? (
          !artistId ? (
            <PlayRelatedSongs
              isPlaying={isPlaying}
              activeSong={activeSong}
              song={song}
              handlePause={handlePauseClick}
              handlePlay={() => handlePlayClick(song, i)}
            />
          ) : null
        ) : (
          <h3 className="font-bold text-base text-gray-400 mr-3">{i + 1}</h3>
        )}
      </div>

      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          className="w-10 h-10 rounded-lg"
          src={
            artistId
              ? song?.attributes?.artwork?.url
                  .replace("{w}", "125")
                  .replace("{h}", "125")
              : song?.images?.coverart
          }
          alt={song?.title}
        />
        <div className="flex-1 flex flex-col justify-center mx-3">
          {!artistId ? (
            <Link to={`/songs/${song.key}`}>
              <p
                className={`text-md font-bold text-gray-200
               ${activeSong?.title === song?.title ? "text-green-500" : ""}
          `}
              >
                {song?.title}
              </p>
            </Link>
          ) : (
            <p
              className={`text-md font-bold text-gray-200
            ${activeSong?.title === song?.title ? "text-green-500" : ""}
            `}
            >
              {song?.attributes?.name}
            </p>
          )}
          <p className="text-sm text-gray-300 mt-1">
            {artistId ? song?.attributes?.albumName : song?.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SongBar;
