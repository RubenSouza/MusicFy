import React from "react";

import { AlbumCard } from "../components";
import { useGetUserPodcastsQuery } from "../redux/services/spotifyApi";

const LibraryPodcasts = () => {
  const {
    data: userPodcats,
    isFetching: isFetchingUserPodcasts,
    error: userPodcastsError,
  } = useGetUserPodcastsQuery();

  return (
    <div className="h-screen text-white w-full p-10 pt-20">
      <h1 className="text-2xl font-bold pb-10">Podcasts</h1>
      <div className=" flex justify-start gap-5 flex-wrap">
        {userPodcats?.items?.map((podcast, i) => {
          return <AlbumCard song={podcast.show} key={podcast.show.id} i={i} />;
        })}
      </div>
    </div>
  );
};

export default LibraryPodcasts;
