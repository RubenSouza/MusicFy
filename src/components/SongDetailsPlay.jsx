import React from "react";
import { PlayIcon, PauseIcon, HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/outline";

const SongDetailsPlay = ({
  handlePause,
  handlePlay,
  song,
  isPlaying,
  activeSong,
}) => {
  return (
    <div>
      <div className="p-10">
        {isPlaying && activeSong?.title === song.title ? (
          <PauseIcon
            className="w-16 h-16 p-3 bg-[#1fdf64]/60 rounded-full
text-gray-900 hover:bg-[#1fdf64]/90"
            onClick={handlePause}
          />
        ) : (
          <PlayIcon
            className="w-16 h-16 p-3 bg-[#1fdf64]/60 rounded-full
text-gray-900 hover:bg-[#1fdf64]/90"
            onClick={handlePlay}
          />
        )}
      </div>
      <div className="pt-10">
        <HeartIcon
          className="w-16 h-16 p-3 bg-[#1fdf64]/60 rounded-full
      text-gray-900 hover:bg-[#1fdf64]/90"
        />
      </div>
    </div>
  );
};

export default SongDetailsPlay;
