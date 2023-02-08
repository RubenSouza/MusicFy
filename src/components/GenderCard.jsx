import React from "react";

import { Link } from "react-router-dom";

const GenderCard = ({ category }) => {
  return (
    <div>
      <div
        className="flex flex-col w-[170px] h-[170px] p-4 bg-white/5
          backdrop-blur-sm animate-slideup rounded-lg cursor-pointer
          hover:bg-white/10 hover:duration-700 group group-hover:
          "
      >
        <div className="relative rounded-lg overflow-hidden w-full h-full">
          <img
            src={category?.icons?.[0]?.url}
            alt="songs"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col mt-4">
          <p className="text-white font-bold truncate text-1xl">
            {category?.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GenderCard;
