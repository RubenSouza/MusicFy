import React from "react";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { PlayIcon, PauseIcon, ArrowPathIcon } from "@heroicons/react/24/solid";
import {
  BsArrowRepeat,
  BsFillPauseFill,
  BsFillPlayFill,
  BsShuffle,
} from "react-icons/bs";

const Controls = ({
  isPlaying,
  repeat,
  setRepeat,
  shuffle,
  setShuffle,
  currentSongs,
  handlePlayPause,
  handlePrevSong,
  handleNextSong,
}) => (
  <div
    className="flex items-center justify-around lg:w-52 
  2xl:w-80 space-x-3 space-y-1 bg"
  >
    <ArrowPathIcon
      color={repeat ? "white" : "#5e5e5e"}
      onClick={() => setRepeat(prev => !prev)}
      className="hidden sm:block w-8 h-8 p-1 text-[#5e5e5e] hover:text-[#e5e5e5]"
    />
    {currentSongs?.length && (
      <MdSkipPrevious
        className="w-9 h-9 p-[5px] text-[#5e5e5e] hover:text-[#e5e5e5]"
        onClick={handlePrevSong}
      />
    )}
    {isPlaying ? (
      <PauseIcon
        onClick={handlePlayPause}
        className="w-8 h-8 p-[5px] bg-white rounded-full"
      />
    ) : (
      <PlayIcon
        onClick={handlePlayPause}
        className="w-8 h-8 p-[5px] bg-white rounded-full"
      />
    )}
    {currentSongs?.length && (
      <MdSkipNext
        className="w-9 h-9 p-[5px] text-[#5e5e5e] hover:text-[#e5e5e5]"
        onClick={handleNextSong}
      />
    )}
    <BsShuffle
      color={shuffle ? "white" : ""}
      onClick={() => setShuffle(prev => !prev)}
      className="hidden sm:block w-8 h-8 p-[5px] text-[#5e5e5e] hover:text-[#e5e5e5]"
    />
  </div>
);

export default Controls;
