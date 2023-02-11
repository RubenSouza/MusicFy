import React from "react";
import { ArtistCard } from "../components";
import { useGetUserArtistsQuery } from "../redux/services/spotifyApi";

const LibraryArtists = () => {
  const {
    data: userArtists,
    isFetching: isFetchingArtists,
    error: artistsError,
  } = useGetUserArtistsQuery();

  return (
    <div className="h-screen text-white flex flex-col p-10 pt-20">
      <h1 className="text-2xl font-bold pb-5">Artists</h1>
      <div className="flex justify-start gap-5 flex-wrap">
        {userArtists?.artists?.items.map((song, i) => {
          return <ArtistCard song={song} key={song.id} />;
        })}
      </div>
    </div>
  );
};

export default LibraryArtists;
