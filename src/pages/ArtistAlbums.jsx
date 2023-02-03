import React from "react";
import { useParams } from "react-router-dom";
import { AlbumCard } from "../components";
import { useGetArtistAlbumsQuery } from "../redux/services/spotifyApi";

const ArtistAlbums = () => {
  const { id: artistId } = useParams();

  const {
    data: artistAlbums,
    isFetching: isFetchingArtistAlbums,
    error: artistAlbumsError,
  } = useGetArtistAlbumsQuery({ artistId });
  return (
    <div className="w-full h-screen">
      <div className="mt-10 px-10 pb-24">
        <div className="relative flex justify-between w-[98%]">
          <h1 className="text-2xl font-bold pb-8">Albums</h1>
        </div>
        <div className="flex justify-start px-2 gap-5 flex-wrap">
          {artistAlbums?.items?.map((album, i) => (
            <AlbumCard song={album} key={album.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistAlbums;
