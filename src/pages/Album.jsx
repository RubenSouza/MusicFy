import React from "react";
import { useParams } from "react-router-dom";
import { useGetAlbumQuery } from "../redux/services/spotifyApi";
import {
  PlayIcon,
  PauseIcon,
  HeartIcon as SolidHeart,
} from "@heroicons/react/24/solid";
import { AlbumTable } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { setActiveSong, playPause } from "../redux/features/playerSlice";

const Album = () => {
  const { id: albumId } = useParams();

  const { activeSong, isPlaying } = useSelector(state => state.player);

  const {
    data: Album,
    isFetching: isFetchingAlbum,
    error: AlbumError,
  } = useGetAlbumQuery({ albumId });

  let data = Album?.tracks.items;

  const dispatch = useDispatch();

  const handlePause = () => {
    dispatch(playPause(false));
  };

  const handlePlay = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="h-screen text-white w-full">
      {/* Top Component */}
      <div
        className="flex items-end w-full h-[400px] bg-gradient-to-b 
      from-[#0a61a8]/60 to-[#121212]/50 px-10 space-x-6"
        id="header"
      >
        <div>
          <img
            src={Album?.images[0].url}
            className="max-h-60 rounded-sm shadow-[0_-5px_22px_10px_#00000030]"
          />
        </div>
        <div className="flex flex-col">
          <p className="uppercase text-xs font-bold">Álbum</p>
          <h1 className="text-5xl font-bold">{Album?.name}</h1>
          <div className="flex items-center space-x-1 pt-6">
            <img src={Album?.images.background} className="h-8 rounded-full" />
            <p className="text-sm font-bold">{Album?.artists[0]?.name}</p>
            <p className="text-base font-extrabold">-</p>
            <p className="text-sm">{`${Album?.tracks.total} Músicas`}</p>
          </div>
        </div>
      </div>

      {/* Play and Pause Button */}

      <div className="p-8">
        {!isPlaying ? (
          <PlayIcon
            className="w-14 h-14 p-3 bg-[#1fdf64]/90 rounded-full
text-[#111111] hover:bg-[#1fdf64]/90"
            onClick={() => {
              handlePlay(Album?.tracks?.items[0], 0);
            }}
          />
        ) : (
          <PauseIcon
            className="w-14 h-14 p-3 bg-[#1fdf64]/90 rounded-full
text-[#111111] hover:bg-[#1fdf64]/90"
            onClick={() => {
              handlePause();
            }}
          />
        )}
      </div>

      {/* Tracks */}

      <AlbumTable AlbumData={Album} />
    </div>
  );
};

export default Album;