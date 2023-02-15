import React from "react";

import { Link } from "react-router-dom";

const PodcastCard = ({ song }) => {
  return (
    <div>
      <div
        className="flex flex-col w-[200px] h-[285px] p-4 bg-white/5
          backdrop-blur-sm animate-slideup rounded-lg cursor-pointer
          hover:bg-white/10 hover:duration-700 group group-hover:
          "
      >
        <Link to={`/podcast/${song?.id}`}>
          <div className="relative h-[170px] rounded-lg overflow-hidden">
            <img
              src={song?.images?.[0]?.url}
              alt="songs"
              className="w-full h-full"
            />
          </div>

          <div className="flex flex-col mt-4">
            <p className="text-white font-bold truncate text-1xl">
              {song.name}
            </p>

            <p className="text-gray-400 text-sm capitalize mt-1 truncate">
              {song?.publisher}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PodcastCard;
