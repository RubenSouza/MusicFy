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
  isPlaying && activeSong?.track?.name === song?.track?.name ? (
    <PauseIcon className="text-gray-300 h-5" onClick={handlePause} />
  ) : (
    <PlayIcon className="text-gray-300 h-4" onClick={handlePlay} />
  );

const SongBar2 = ({
  song,
  i,
  PlaylistData,
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
        activeSong?.track?.name === song?.track?.name
          ? "bg-[#313131]/50"
          : "bg-transparent"
      }`}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <td className="p-3">
        {isHovered ? (
          <PlayRelatedSongs
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePause}
            handlePlay={() => handlePlay(song, i)}
          />
        ) : (
          <p className="text-base text-gray-300 mt-1">{i + 1}</p>
        )}
      </td>

      <td>
        <div className="flex flex-row space-x-5 items-center">
          <img
            className="w-10 h-10 "
            src={PlaylistData?.images[0]?.url
              .replace("{w}", "125")
              .replace("{h}", "125")}
            alt={song?.title}
          />
          <div className="flex flex-col justify-center ">
            <Link to={`/songs/aeohaoih`}>
              <p
                className={`text-md font-bold text-gray-200 ${
                  activeSong?.track?.name === song?.track?.name
                    ? "text-green-500"
                    : ""
                }`}
              >
                {song?.track?.name}
              </p>
            </Link>
            {song?.track?.artists?.length > 1 ? (
              <div className="flex capitalize">
                {song?.track?.artists?.map((artist, i) => (
                  <p className={`text-sm text-gray-300 mt-1`} key={i}>
                    {artist?.name},
                  </p>
                ))}
              </div>
            ) : (
              <div className="flex capitalize">
                <p className="text-sm text-gray-300 mt-1">
                  {song?.track?.artists[0]?.name}
                </p>
              </div>
            )}
          </div>
        </div>
      </td>
      <td>
        <Link to={`/albums/${song?.track?.album.id}`}>
          <p className="text-sm text-gray-300 mt-1">
            {song?.track?.album?.name}{" "}
          </p>
        </Link>
      </td>
      <td>
        <p className="text-sm text-gray-300 mt-1">
          {song?.added_at?.slice(0, 10)}
        </p>
      </td>
      <td>
        <p className="text-sm text-gray-300 mt-1">
          {" "}
          {(song?.track?.duration_ms / 60000).toFixed(2)}
        </p>
      </td>
    </tr>
  );
};

export default SongBar2;
