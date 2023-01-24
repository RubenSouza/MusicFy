import React from "react";
import { PlayIcon, PauseIcon } from "@heroicons/react/24/solid";

const PlayPause = ({
  isPlaying,
  activeSong,
  song,
  handlePause,
  handlePlay,
}) => {
  return (
    <div
      className={`flex flex-col justify-center items-center 
group-hover:opacity-100 duration-700 ${
        isPlaying && activeSong?.title === song.title
          ? "opacity-100"
          : "opacity-0"
      }
`}
    >
      {isPlaying && activeSong?.title === song.title ? (
        <PauseIcon
          className="w-14 h-14 p-3 bg-[#1fdf64]/60 rounded-full
absolute text-gray-900 bottom-[50%] right-[35%]
hover:bg-[#1fdf64]/90"
          onClick={handlePause}
        />
      ) : (
        <PlayIcon
          className="w-14 h-14 p-3 bg-[#1fdf64]/60 rounded-full
absolute text-gray-900 bottom-[50%] right-[35%]
hover:bg-[#1fdf64]/90"
          onClick={handlePlay}
        />
      )}
    </div>
  );
};

export default PlayPause;
