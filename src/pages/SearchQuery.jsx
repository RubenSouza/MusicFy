import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsSearch } from "../redux/features/topButtons";
import { Link, useParams } from "react-router-dom";
import { useGetSearchQuery } from "../redux/services/spotifyApi";

import { SongBar4 } from "../components";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const SearchQuery = () => {
  const { item: queryItem } = useParams();

  const {
    data: searchQuery,
    isFetching: isFetchingSearchQuery,
    error: searchQueryError,
  } = useGetSearchQuery({ queryItem });

  console.log(searchQuery);

  let music = searchQuery?.tracks?.items?.slice(0, 4);
  let data = searchQuery?.tracks?.items;

  const dispatch = useDispatch();

  const { activeSong, isPlaying } = useSelector(state => state.player);

  const handlePause = () => {
    dispatch(playPause(false));
  };

  const handlePlay = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  useEffect(() => {
    dispatch(setIsSearch(true));

    return () => {
      dispatch(setIsSearch(false));
    };
  }, []);

  return (
    <div className="h-screen w-full text-white pt-20 pl-10">
      <div className="flex flex-row w-full">
        {/* Best Result */}
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Melhor resultado</h1>

          <div
            className="min-w-[430px] h-[225px] bg-white/5 mt-6
    backdrop-blur-sm animate-slideup rounded-lg cursor-pointer
    hover:bg-white/10 hover:duration-700 group group-hover"
          >
            <Link to={`/artists/${searchQuery?.artists?.items[0]?.id}`}>
              <div className="">
                {searchQuery?.artists && (
                  <img
                    src={searchQuery?.artists?.items?.[0].images?.[0].url}
                    className="rounded-full w-[85px] m-4 mb-3 mt-7 shadow-[0_0px_5px_5px_#00000030] 
              transform group-hover:scale-110 duration-500 ease-in-out"
                  />
                )}
                <p className="text-3xl font-bold mx-5 ">
                  {searchQuery?.artists?.items?.[0]?.name}
                </p>
                <p
                  className="bg-[#121212] uppercase font-bold text-xs p-2 rounded-full
            w-20 text-center mx-5 my-2"
                >
                  {searchQuery?.artists?.items?.[0]?.type}
                </p>
              </div>
            </Link>
          </div>
        </div>
        {/* Musics */}
        <div className="flex flex-col ml-10 w-[70%] items-start justify-start">
          <h1 className="text-2xl font-bold">Músicas</h1>
          <div className="w-full">
            <table className="w-full mt-6">
              <tbody>
                {music?.map((song, i) => (
                  <SongBar4
                    song={song}
                    i={i}
                    key={i}
                    PlaylistData={data}
                    handlePlay={handlePlay}
                    handlePause={handlePause}
                    activeSong={activeSong}
                    isPlaying={isPlaying}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchQuery;
