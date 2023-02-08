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
  (isPlaying && activeSong?.track?.name) || activeSong?.name === song?.name ? (
    <PauseIcon className="text-gray-300 h-6 " onClick={handlePause} />
  ) : (
    <PlayIcon className="text-gray-300 h-6" onClick={handlePlay} />
  );

const SongBar4 = ({
  song,
  i,
  AlbumData,
  handlePlay,
  handlePause,
  activeSong,
  isPlaying,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <tr
      key={i}
      className={`hover:bg-[#313131]/50 h-14
      ${
        activeSong?.track?.name || activeSong?.name === song?.name
          ? "bg-[#313131]/50 rounded-xl"
          : "bg-transparent"
      }`}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <td className="pl-3 mt-3 w-[80px]">
        <div className="absolute p-2">
          {isHovered && (
            <PlayRelatedSongs
              isPlaying={isPlaying}
              activeSong={activeSong}
              song={song}
              handlePause={handlePause}
              handlePlay={() => handlePlay(song, i)}
            />
          )}
        </div>
        <div className="">
          <img
            className="w-10 h-10 rounded-sm object-cover"
            src={AlbumData?.images?.[0]?.url || song?.album?.images?.[0]?.url}
            alt={song?.name}
          />
        </div>
      </td>

      <td>
        <div className="flex flex-row">
          <div className="flex flex-col justify-start ">
            <Link to={`/songs/${song.id}`}>
              <p
                className={`text-md font-bold text-gray-200 ${
                  activeSong?.track?.name || activeSong?.name === song?.name
                    ? "text-green-500"
                    : ""
                }`}
              >
                {song?.name}
              </p>
            </Link>
            {song?.artists?.length > 1 ? (
              <div className="flex capitalize">
                {song?.artists?.map((artist, i) => (
                  <p className={`text-sm text-gray-300 mt-1`} key={i}>
                    {artist?.name},
                  </p>
                ))}
              </div>
            ) : (
              <div className="flex capitalize">
                <p className="text-sm text-gray-300 mt-1">
                  {song?.artists?.[0]?.name}
                </p>
              </div>
            )}
          </div>
        </div>
      </td>

      <td>
        <p className="text-sm text-gray-300">
          {" "}
          {(song?.duration_ms / 60000)?.toFixed(2)}
        </p>
      </td>
    </tr>
  );
};

export default SongBar4;
