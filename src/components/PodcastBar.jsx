import React from "react";

const PodcastBar = ({ song }) => {
  return (
    <div
      className="h-[130px] w-[900px] flex flex-col justify-start 
      items-start mt-6 mb-6 "
    >
      <div
        className="flex flex-row justify-start
      items-start w-full h-full"
      >
        <img
          src={song?.images?.[0].url}
          alt="podcast image"
          className="w-28 h-28 rounded-lg"
        />
        <div
          className="relative flex flex-col pl-3
          h-[70%] w-full max-w-full 
        "
        >
          <h3 className="text-lg font-bold">{song?.name}</h3>
          <p
            className="text-sm text-gray-400 
          text-ellipsis overflow-hidden whitespace-pre-wrap ..."
          >
            {song?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PodcastBar;
