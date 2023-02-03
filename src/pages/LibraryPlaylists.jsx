import React from "react";
import { useSelector } from "react-redux";
import { PlaylistCard } from "../components";
import { useGetUserPlaylistsQuery } from "../redux/services/spotifyApi";

const LibraryPlaylists = () => {
  const { data: playlists } = useGetUserPlaylistsQuery();

  const { activeSong, isPlaying } = useSelector(state => state.player);

  return (
    <div className="h-screen text-white flex flex-col p-10 pt-20">
      <h1 className="text-2xl font-bold pb-5">Playlists</h1>
      <div className="flex justify-start gap-5 flex-wrap">
        {playlists?.items?.map((playlist, i) => {
          return (
            <PlaylistCard
              song={playlist}
              key={playlist.id}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={playlists}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LibraryPlaylists;
