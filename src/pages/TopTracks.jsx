import React from "react";
import { useSelector } from "react-redux";

import { useGetTopTracksQuery } from "../redux/services/spotifyApi";

import { Error, Loader, TopTracksCard } from "../components";
import { Link } from "react-router-dom";

const TopTracks = () => {
  const { activeSong, isPlaying } = useSelector(state => state.player);

  const {
    data: getTopTracks,
    isFetching: isFetchingTopTracks,
    error: topTracksError,
  } = useGetTopTracksQuery();

  let topTracksData = getTopTracks?.tracks?.items;

  if (isFetchingTopTracks) {
    return <Loader title={"Loading"} type={"spinningBubbles"} />;
  }
  if (topTracksError) {
    return <Error />;
  }

  return (
    <div className="h-screen w-full p-10 pt-16">
      <div className="text-white p-3  mb-4 flex justify-between">
        <h1 className="text-2xl font-bold">As faixas mais tocadas no mundo</h1>
      </div>
      <div className="flex justify-start gap-5 flex-wrap">
        {topTracksData?.map((song, i) => {
          return (
            <TopTracksCard
              song={song}
              key={song.track?.id}
              isPlaying={isPlaying}
              activeSong={activeSong}
              i={i}
              data={topTracksData}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TopTracks;
