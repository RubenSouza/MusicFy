import React from "react";
import { useSelector } from "react-redux";

import {
  useGetFeaturedPlaylistsQuery,
  useGetUserProfileQuery,
} from "../redux/services/spotifyApi";

import { Error, Loader, PlaylistCard } from "../components";

const Featured = () => {
  const { activeSong, isPlaying } = useSelector(state => state.player);

  const {
    data: featuredPlaylists,
    isFetching: isFetchingFeatured,
    error: recommendationsError,
  } = useGetFeaturedPlaylistsQuery();

  const {
    data: userProfile,
    isFetching: isFetchingUserProfile,
    error: userProfileError,
  } = useGetUserProfileQuery();

  if (isFetchingFeatured || isFetchingUserProfile) {
    return <Loader title={"Loading"} type={"spinningBubbles"} />;
  }
  if (recommendationsError) {
    return <Error />;
  }

  return (
    <div className="h-screen w-full p-10 pt-16">
      <div className="text-white p-3  mb-4 flex justify-between">
        <h1 className="text-2xl font-bold">Playlists Mais Tocadas</h1>
      </div>
      <div className="flex justify-start gap-5 flex-wrap">
        {featuredPlaylists?.playlists?.items?.map((song, i) => {
          return (
            <PlaylistCard
              song={song}
              key={song.id}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={featuredPlaylists}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Featured;
