import React, { useState } from "react";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  BuildingLibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
} from "@heroicons/react/24/solid";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/spotiMusic.png";
import { useGetUserPlaylistsQuery } from "../redux/services/spotifyApi";
import { useSelector } from "react-redux";

const SideBar = () => {
  const { activeSong } = useSelector(state => state.player);

  const [isActiveMenu, setIsActiveMenu] = useState("home");

  const { data: playlists } = useGetUserPlaylistsQuery();

  let activeStyle =
    "flex items-center space-x-3 hover:text-white text-white font-bold";
  let inactiveStyle = "flex items-center space-x-3 hover:text-white font-bold";

  return (
    <div
      className={`pl-5 pt-2 pb-6 ${
        activeSong?.track?.name ? "pb-28" : ""
      } w-[300px] text-gray-500  text-sm overflow-y-scroll 
      h-screen scrollbar scrollbar-hide bg-[#000000]
    sm:flex justify-start items-start  flex-col hidden 
    `}
    >
      <div>
        <img src={logo} alt="logo" className="w-36 object-contain pb-4" />
      </div>

      <div className="space-y-4 flex flex-col items-start justify-center">
        <NavLink
          to={"/"}
          end
          className={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
        >
          <HomeIcon className="w-7 h-7" />
          <p className="text-base">Discover</p>
        </NavLink>

        <NavLink
          to={"/search"}
          className={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
        >
          <MagnifyingGlassIcon className="w-7 h-7" />
          <p className="text-base">Search</p>
        </NavLink>

        <NavLink
          to={"/library"}
          className={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
        >
          <BuildingLibraryIcon className="w-7 h-7" />
          <p className="text-base">Your Library</p>
        </NavLink>
        <hr className="border-t-[0.1px] border-gray-900 pb-2" />
        <NavLink
          to={"/favorites"}
          className={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
        >
          <HeartIcon className="w-7 h-7" />
          <p className="text-base">Favorites</p>
        </NavLink>

        <NavLink
          to={"/around-you"}
          className={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
        >
          <RssIcon className="w-7 h-7" />
          <p className="text-base">Around You</p>
        </NavLink>
      </div>
      <hr className="mt-8 border-t-[1px] w-[90%] border-[#282828]" />
      <div
        className="relative text-md w-[90%] text-gray-400 
      space-y-4 pt-5 overflow-y-scroll scrollbar scrollbar-hide"
      >
        {playlists?.items?.map(playlist => (
          <p className="truncate ... hover:text-white" key={playlist.id}>
            <NavLink
              className={({ isActive }) => (isActive ? "text-white" : "")}
              to={`/playlist/${playlist.id}`}
            >
              {playlist.name}
            </NavLink>
          </p>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
