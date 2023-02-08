import React from "react";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import { useGetUserProfileQuery } from "../redux/services/spotifyApi";
import userImage from "../assets/userImage.png";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Searchbar from "./Searchbar";

const TopButtons = () => {
  const [isActiveMenu, setIsActiveMenu] = useState(false);

  let state = useSelector(state => state.topButtons.isLibrary);
  let searchState = useSelector(state => state.topButtons.isSearch);

  const [isLibrary, setIsLibrary] = useState(state);
  const [isSearch, setIsSearch] = useState(searchState);

  useEffect(() => {
    setIsLibrary(state);
    setIsSearch(searchState);
  }, [state, searchState]);

  const {
    data: userProfile,
    isFetching: isFetchingUserProfile,
    error: userProfileError,
  } = useGetUserProfileQuery();

  const isLogged = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("refresh_token");
    sessionStorage.removeItem("expires_in");
    sessionStorage.removeItem("isLogged");
    window.location.href = "/";
  };

  let activeStyle = "text-white font-bold bg-[#333333] rounded-md ";
  let inactiveStyle = "text-white font-bold";

  return (
    <div
      className={`flex justify-between max-w-[calc(100vw-40%)]  xl:max-w-[calc(100vw-25%)]
      2xl:max-w-[calc(100vw-20%)] px-6 py-3`}
    >
      <div className="flex items-center space-x-8">
        {/* Go and Back Buttons */}
        <div className="flex items-center space-x-4">
          <ChevronLeftIcon
            className="w-8 h-8 rounded-full bg-[#121212] p-1
         text-white hover:cursor-pointer"
            onClick={() => window.history.go(-1)}
          />
          <ChevronRightIcon
            className="w-8 h-8 rounded-full bg-[#121212] p-1
         text-white hover:cursor-pointer"
            onClick={() => window.history.go(1)}
          />
        </div>
        {/* Library Buttons */}
        <div
          className={`flex items-center space-x-4 text-white font-bold text-sm
        ${isLibrary ? "" : "hidden"}`}
        >
          <NavLink
            to="/library"
            end
            className={({ isActive }) =>
              isActive ? activeStyle : inactiveStyle
            }
          >
            <p className="py-3 px-4">Playlists</p>
          </NavLink>
          <NavLink
            to="/library/podcasts"
            className={({ isActive }) =>
              isActive ? activeStyle : inactiveStyle
            }
          >
            <p className="py-3 px-4">Podcasts</p>
          </NavLink>
          <NavLink
            to="/library/artists"
            className={({ isActive }) =>
              isActive ? activeStyle : inactiveStyle
            }
          >
            <p className="py-3 px-5">Artists</p>
          </NavLink>
          <NavLink
            to="library/albums"
            className={({ isActive }) =>
              isActive ? activeStyle : inactiveStyle
            }
          >
            <p className="py-3 px-5">Albums</p>
          </NavLink>
        </div>
        {/* Search Buttons */}
        <div className={isSearch ? "" : "hidden"}>
          <Searchbar />
        </div>
      </div>
      <div className="flex items-center flex-col space-y-1">
        <div
          className=" w-[190px] hover:cursor-pointer rounded-full p-2 flex space-x-2 justify-center 
        items-center bg-[#121212]"
          onClick={() => setIsActiveMenu(!isActiveMenu)}
        >
          <img
            src={userImage}
            className="w-7 bg-slate-100 rounded-full p-[2px]"
          />
          <p className="text-white text-sm font-bold truncate">
            {userProfile?.display_name}
          </p>
          <ChevronDownIcon className="w-9 text-white p-1" />
        </div>
        <div
          className={`w-[190px] flex justify-center items-end bg-[#121212]/30 hover:bg-[#121212]
        rounded-lg p-2 cursor-pointer ${!isActiveMenu ? "hidden" : ""} `}
          onClick={() => isLogged()}
        >
          <p className="text-white">Log Out</p>
        </div>
      </div>
    </div>
  );
};

export default TopButtons;
