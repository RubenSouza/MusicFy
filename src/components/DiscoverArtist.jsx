import React from "react";
import { Link } from "react-router-dom";

const DiscoverArtist = ({ artist, i }) => {
  return (
    <Link
      to={`/artists/${artist?.id}`}
      className=" w-[10%] sm:w-[32%] xl:w-[32%] md:h-[90px] rounded-md
        overflow-hidden bg-gradient-to-br from-[#ffffff]/10 to-[#ceaf7d]/10
        flex hover:bg-gradient-to-br hover:from-[#ffffff]/10 hover:to-[#fff7eb]/10
        hover:cursor-pointer flex-shrink-0 truncate
    "
    >
      <img
        src={artist?.images[0]?.url}
        alt="name"
        className="h-full object-contain "
      />

      <div className="flex items-center justify-center px-4">
        <p className="text-white text-lg font-bold capitalize">
          {artist?.name}
        </p>
      </div>
    </Link>
  );
};

export default DiscoverArtist;
