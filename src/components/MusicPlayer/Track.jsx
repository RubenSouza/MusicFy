import React from "react";
import music from "../../assets/music.png";

const Track = ({ isPlaying, isActive, activeSong }) => (
  <div className="flex-1 flex items-center justify-start">
    <div
      className={`${
        isPlaying && isActive ? "animate-[spin_3s_linear_infinite]" : ""
      } hidden sm:block sm:truncate h-16 w-16 mr-4`}
    >
      <img src={music} alt="cover art" className="rounded-full" />
    </div>
    <div className="w-[200px] sm:[100px]">
      <p className="truncate text-white font-bold text-lg">
        {activeSong?.track?.name ? activeSong?.track?.name : "No active Song"}
      </p>
      <p className="truncate text-gray-300">
        {activeSong?.track?.artists[0].name
          ? activeSong?.track?.artists[0].name
          : "No active Song"}
      </p>
    </div>
  </div>
);

export default Track;
