import React from "react";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const TopTracksCard = ({ song, activeSong, isPlaying, i, data }) => {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    // console.log(i);
    dispatch(playPause(true));
  };

  return (
    <div>
      <div
        className="flex flex-col w-[200px] h-[285px] p-4 bg-white/5
          backdrop-blur-sm animate-slideup rounded-lg cursor-pointer
          hover:bg-white/10 hover:duration-700 group group-hover:
          "
      >
        <div className="relative rounded-lg overflow-hidden">
          <img
            src={song?.track?.album?.images[0]?.url}
            alt="songs"
            className="w-full h-full"
          />
        </div>

        <div className="flex flex-col mt-4">
          <p className="text-white font-bold truncate text-1xl">
            {song?.track?.name}
          </p>

          <p className="text-gray-400 text-sm capitalize mt-1">
            <Link
              to={
                song?.track?.artists
                  ? `/artists/${song?.tracks?.artists[0]?.id}`
                  : "/top-artists"
              }
            >
              {song?.track?.artists[0]?.name}
            </Link>
          </p>
        </div>

        <PlayPause
          isPlaying={isPlaying}
          activeSong={activeSong}
          song={song}
          handlePause={handlePauseClick}
          handlePlay={handlePlayClick}
        />
      </div>
    </div>
  );
};

export default TopTracksCard;
