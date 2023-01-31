import React from "react";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import { useGetUserProfileQuery } from "../redux/services/spotifyApi";
import userImage from "../assets/userImage.png";
import { useState } from "react";

const TopButtons = () => {
  const [isActiveMenu, setIsActiveMenu] = useState(false);

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

  return (
    <div
      className={`flex justify-between max-w-[calc(100vw-40%)]  xl:max-w-[calc(100vw-25%)]
      2xl:max-w-[calc(100vw-20%)] px-6 py-3`}
    >
      <div className="flex space-x-4">
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
      <div className="flex flex-col space-y-1">
        <div
          className=" w-[190px] hover:cursor-pointer rounded-full p-2 flex space-x-2 justify-center 
        items-center bg-[#121212]"
          onClick={() => setIsActiveMenu(!isActiveMenu)}
        >
          <img src={userImage} className="w-7 bg-slate-100 rounded-full p-1" />
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
