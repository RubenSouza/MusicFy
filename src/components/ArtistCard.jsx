import React from "react";
import { Link } from "react-router-dom";

const ArtistCard = ({ song, i }) => {
  return (
    <div>
      <div
        className="flex flex-col w-[200px] h-[285px] p-4 bg-white/5
          backdrop-blur-sm animate-slideup rounded-lg cursor-pointer
          hover:bg-white/10 hover:duration-700 group group-hover:
          "
      >
        <Link to={`/artists/${song?.id}`}>
          <div className="relative rounded-lg overflow-hidden">
            <img
              src={song?.images?.[0]?.url}
              alt="songs"
              className="w-full h-full rounded-full"
            />
          </div>
        </Link>
        <div className="flex flex-col w-full h-full mt-4">
          <Link to={`/artists/${song?.id}`}>
            <p className="text-white font-bold text-1xl truncate">
              {song.name}
            </p>
            <p className="text-gray-400 pt-3 text-sm ">Artists</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;
