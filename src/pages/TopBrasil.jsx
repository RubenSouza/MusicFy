import React from "react";
import { useSelector } from "react-redux";

import { useGetTopBrasilQuery } from "../redux/services/spotifyApi";

import { Error, Loader, TopTracksCard } from "../components";

const TopBrasil = () => {
  const { activeSong, isPlaying } = useSelector(state => state.player);

  const {
    data: getTopBrasil,
    isFetching: isFetchingBrasil,
    error: topBrasilError,
  } = useGetTopBrasilQuery();

  let topBrasilData = getTopBrasil?.tracks?.items;

  if (isFetchingBrasil) {
    return <Loader title={"Loading"} type={"spinningBubbles"} />;
  }
  if (topBrasilError) {
    return <Error />;
  }

  return (
    <div className="h-screen w-full p-10 pt-16">
      <div className="text-white p-3  mb-4 flex justify-between">
        <h1 className="text-2xl font-bold">As faixas mais tocadas no Brasil</h1>
      </div>
      <div className="flex justify-start gap-5 flex-wrap">
        {topBrasilData?.map((song, i) => {
          return (
            <TopTracksCard
              song={song}
              key={song.track?.id}
              isPlaying={isPlaying}
              activeSong={activeSong}
              i={i}
              data={topBrasilData}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TopBrasil;
