import React from "react";

import {
  useGetUserFavoritesQuery,
  useGetUserProfileQuery,
} from "../redux/services/spotifyApi";
import {
  PlayIcon,
  PauseIcon,
  HeartIcon as SolidHeart,
} from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { setActiveSong, playPause } from "../redux/features/playerSlice";

import PlaylistTable from "../components/PlaylistTable";

const Favorites = () => {
  const { data: PlaylistData, isFetching, error } = useGetUserFavoritesQuery();

  const {
    data: userProfile,
    isFetching: isFetchingUserProfile,
    error: userProfileError,
  } = useGetUserProfileQuery();

  console.log(PlaylistData);

  const { activeSong, isPlaying } = useSelector(state => state.player);

  let data = PlaylistData?.items;

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
      {/* Header */}
      <div
        className="flex items-end w-full h-[400px] bg-gradient-to-b 
      from-[#0a61a8]/60 to-[#121212]/50 px-10 space-x-6"
        id="header"
      >
        <div>
          {/* <img
            src={PlaylistData?.images[0]?.url}
            className="max-h-60 rounded-sm shadow-[0_-5px_22px_10px_#00000030]"
          /> */}
          <SolidHeart
            className="w-60 max-h-60 text-[#0a61a8]
      rounded-sm shadow-[0_-5px_22px_10px_#00000030]"
          />
        </div>
        <div className="flex flex-col">
          <p className="uppercase text-xs font-bold">Playlist</p>
          <h1 className="text-5xl font-bold">Favorites</h1>
          <div className="flex items-center space-x-1 pt-6">
            <p className="text-sm font-bold">{userProfile?.display_name}</p>
            <p className="text-base font-extrabold">-</p>
            <p className="text-sm">{`${PlaylistData?.items?.length} Músicas`}</p>
          </div>
        </div>
      </div>

      {/* Icons */}

      <div className="p-8">
        {!isPlaying ? (
          <PlayIcon
            className="w-14 h-14 p-3 bg-[#1fdf64]/90 rounded-full
text-[#111111] hover:bg-[#1fdf64]/90"
            onClick={() => {
              handlePlay(PlaylistData?.items[0], 0);
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

      {/* Table Songs */}

      <PlaylistTable PlaylistData={PlaylistData} />
    </div>
  );
};

export default Favorites;
