import React from "react";
import { useSelector } from "react-redux";

import {
  useGetNewAlbumsQuery,
  useGetUserProfileQuery,
} from "../redux/services/spotifyApi";

import { Error, Loader, TopPlay, AlbumCard } from "../components";
import { Link } from "react-router-dom";

const Albums = () => {
  const { activeSong, isPlaying } = useSelector(state => state.player);

  const {
    data: newAlbums,
    isFetching: isFetchingNewAlbums,
    error: newAlbumsError,
  } = useGetNewAlbumsQuery();

  const {
    data: userProfile,
    isFetching: isFetchingUserProfile,
    error: userProfileError,
  } = useGetUserProfileQuery();

  if (isFetchingNewAlbums) {
    return <Loader title={"Loading"} type={"spinningBubbles"} />;
  }
  if (newAlbumsError) {
    return <Error />;
  }

  return (
    <div className="h-screen w-full p-10 pt-16">
      <div className="text-white p-3  mb-4 flex justify-between">
        <h1 className="text-2xl font-bold">
          Feito para {userProfile?.display_name}
        </h1>
      </div>
      <div className="flex justify-start gap-5 flex-wrap">
        {newAlbums?.albums?.items?.map((song, i) => {
          return (
            <AlbumCard
              song={song}
              key={song.id}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={newAlbums}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Albums;
