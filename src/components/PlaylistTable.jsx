import React, { useState } from "react";

import { ClockIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import SongBar2 from "./SongBar2";

const PlaylistTable = ({ PlaylistData }) => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector(state => state.player);

  let data = PlaylistData?.items;

  const handlePause = () => {
    dispatch(playPause(false));
  };

  const handlePlay = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="h-screen text-white w-full">
      <table
        className=" text-gray-400 font-mono w-[95%] mx-auto
    text-left text-base
       "
      >
        <thead className="uppercase">
          <tr>
            <th>#</th>
            <th>Título</th>
            <th>Álbum</th>
            <th>Adicionado em</th>
            <th>
              <ClockIcon className="w-4 h-4 font-bold" />
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <hr className="mt-5 border-t-[1px] p-3 w-[calc(80vw-10%)]  border-[#282828]" />
            </td>
          </tr>
          {PlaylistData?.tracks?.items
            ? PlaylistData?.tracks.items.map((song, i) => (
                <SongBar2
                  song={song}
                  i={i}
                  key={i}
                  PlaylistData={PlaylistData}
                  handlePlay={handlePlay}
                  handlePause={handlePause}
                  activeSong={activeSong}
                  isPlaying={isPlaying}
                />
              ))
            : PlaylistData?.items.map((song, i) => (
                <SongBar2
                  song={song}
                  i={i}
                  key={i}
                  PlaylistData={PlaylistData}
                  handlePlay={handlePlay}
                  handlePause={handlePause}
                  activeSong={activeSong}
                  isPlaying={isPlaying}
                />
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlaylistTable;

// {
//   PlaylistData?.tracks.items.map((song, i) => (
//     <SongBar2
//       song={song}
//       i={i}
//       key={i}
//       PlaylistData={PlaylistData}
//       handlePlay={handlePlay}
//       handlePause={handlePause}
//       activeSong={activeSong}
//       isPlaying={isPlaying}
//     />
//   ));
// }
