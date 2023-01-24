import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Error, Loader, RelatedSongs, SongDetailsPlay } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import {
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} from "../redux/services/shazamCore";

const SongDetails = () => {
  useEffect(() => {
    setTimeout(() => {
      const handleClickScroll = () => {
        const element = document.querySelector("#header");

        element.scrollIntoView({ behavior: "smooth" });
      };
      handleClickScroll();
    }, 1000);
  }, []);

  const dispatch = useDispatch();
  const { songid, id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector(state => state.player);

  const {
    data,
    isFetching: isFetchinRelatedSongs,
    error,
  } = useGetSongRelatedQuery({ songid });
  const { data: song, isFetching: isFetchingSongDetails } =
    useGetSongDetailsQuery({ songid });

  if (isFetchingSongDetails && isFetchinRelatedSongs) {
    return <Loader title={"Loading"} type={"spinningBubbles"} />;
  }
  if (error) {
    return <Error />;
  }

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data }));
    dispatch(playPause(true));
  };

  const handlePlayRelated = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="text-white w-full bg-red h-screen">
      {/* Header */}
      <div
        className="flex items-end w-full h-[400px] bg-gradient-to-b 
      from-[#0a4b1b]/60 to-[#121212]/50 px-10 space-x-6"
        id="header"
      >
        <div>
          <img
            src={song?.images.coverart}
            className="max-h-60 rounded-sm shadow-[0_-5px_22px_10px_#00000030]"
          />
        </div>
        <div className="flex flex-col">
          <p className="uppercase text-xs font-bold">Música</p>
          <h1 className="text-7xl font-bold">{song?.title}</h1>
          <div className="flex items-center space-x-1 pt-6">
            <img src={song?.images.background} className="h-8 rounded-full" />
            <p className="text-sm font-bold">{song?.subtitle}</p>
            <p className="text-base font-extrabold">-</p>
            <p className="text-sm font-bold">
              {song?.sections[0].metadata[2].text}
            </p>
          </div>
        </div>
      </div>
      {/* Icons */}
      <div className="flex">
        <SongDetailsPlay
          song={song}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePlay={handlePlayClick}
          handlePause={handlePauseClick}
        />
      </div>

      {/* Lyrics */}

      <div className="pl-10 flex space-x-[35%]">
        <div>
          {" "}
          <p className="text-2xl font-bold pb-8">Letra</p>
          {song?.sections[1].type === "LYRICS" ? (
            song?.sections[1].text.map((line, i) => (
              <p className="text-gray-300 m-1" key={i}>
                {line}
              </p>
            ))
          ) : (
            <p>Sorry, no lyrics found!</p>
          )}
        </div>
        <div className="flex h-24">
          <img src={song?.images.background} className="h-24 rounded-full" />
          <div className="flex flex-col items-start justify-center p-2">
            <p className="text-sm font-bold uppercase">Artista</p>
            <p className="text-md font-bold">{song?.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Related Songs */}
      <div className="pl-10 pt-10 pb-10">
        <RelatedSongs
          data={data}
          artistId={artistId}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePauseClick={handlePauseClick}
          handlePlayClick={handlePlayRelated}
        />
      </div>
    </div>
  );
};

export default SongDetails;
