import React from "react";

import { useGetUserAlbumsQuery } from "../redux/services/spotifyApi";

import { Error, MyAlbum } from "../components";

const LibraryAlbums = () => {
  const {
    data: userAlbums,
    isFetching,
    error: userAlbumsError,
  } = useGetUserAlbumsQuery();

  console.log(userAlbums);

  if (userAlbumsError) {
    return <Error />;
  }

  return (
    <div className="h-screen text-white flex flex-col p-10 pt-20">
      <h1 className="text-2xl font-bold pb-5">Albums</h1>

      <div className="flex justify-start gap-5 flex-wrap">
        {userAlbums?.items?.map((song, i) => {
          return <MyAlbum song={song} key={song.album?.id} i={i} />;
        })}
      </div>
    </div>
  );
};

export default LibraryAlbums;
