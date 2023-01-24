import React from "react";
import logospotify from "../assets/logospotify.svg";
import musicpaper from "../assets/musicpaper.png";

const Login = ({ handleLogin }) => {
  return (
    <div
      className="p-2 h-screen w-full bg-gradient-to-b 
    from-[#1db954] to-[#121212] flex items-center justify-center
    "
    >
      <div
        className="flex items-center justify-center bg-[#000000] 
      h-[800px] w-[1400px] rounded-xl shadow-[#000000] shadow-lg"
      >
        <div
          className="bg-[#292c31] flex flex-col justify-end 
        flex-1 relative h-full w-full space-y-8 rounded-l-xl"
        >
          <div
            className="text-5xl font-bold space-y-6 text-white flex flex-col 
          items-center justify-center"
          >
            <p>Millons of songs.</p>
            <p>Free on Spotify.</p>
          </div>
          <div>
            <img src={musicpaper} className="h-[500px]" />
          </div>
        </div>
        <div
          className="flex flex-col flex-1 relative h-full w-full 
        items-center justify-start space-y-48 py-40"
        >
          <img src={logospotify} className="h-28" />
          <button
            className="bg-[#1db954]/70 w-52 rounded-xl text-xl text-white 
        p-5 flex justify-center hover:bg-[#1db954]"
            onClick={handleLogin}
          >
            Login with Spotify
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
