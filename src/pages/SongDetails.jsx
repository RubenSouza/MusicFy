import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Error, Loader, RelatedSongs, SongDetailsPlay } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import {
  useGetSongQuery,
  useGetArtistQuery,
} from "../redux/services/spotifyApi";

const SongDetails = () => {
  useEffect(() => {
    const getLyrics = async () => {
      let response = await fetch(
        `https://spotify-lyric-api.herokuapp.com/?trackid=${songId}`,
        {
          method: "GET",
        }
      )
        .then(res => res.json())
        .then(data => {
          setLyrics(data);
          return data;
        });
      return response;
    };

    getLyrics();

    setTimeout(() => {
      const handleClickScroll = () => {
        const element = document.querySelector("#header");

        element.scrollIntoView({ behavior: "smooth" });
      };
      handleClickScroll();
    }, 1000);
  }, []);

  const dispatch = useDispatch();

  let { id: songId } = useParams();
  const { activeSong, isPlaying } = useSelector(state => state.player);
  const [lyrics, setLyrics] = useState();

  const {
    data: songDetails,
    isFetching: isFetchingSongDetails,
    error: songDetailsError,
  } = useGetSongQuery({ songId });

  let artistId = songDetails?.artists[0]?.id;

  const {
    data: artistDetails,
    isFetching: isFetchingArtistDetails,
    error: artistDetailsError,
  } = useGetArtistQuery({ artistId });

  if (isFetchingSongDetails) {
    return <Loader title={"Loading"} type={"spinningBubbles"} />;
  }
  if (songDetailsError) {
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
      from-[#0a4b1b]/60 to-[#121212]/50 px-10 space-x-6 "
        id="header"
      >
        <div>
          <img
            src={songDetails?.album?.images[0]?.url}
            className="max-h-60 rounded-sm shadow-[0_-5px_22px_10px_#00000030]"
          />
        </div>
        <div className="flex flex-col">
          <p className="uppercase text-xs font-bold">Música</p>
          <h1 className="text-7xl font-bold">{songDetails?.name}</h1>
          <div className="flex items-center space-x-1 pt-6">
            <img
              src={artistDetails?.images[0]?.url}
              className="h-8 rounded-full"
            />
            {songDetails?.artists?.length > 1 ? (
              <div className="flex capitalize">
                {songDetails?.artists.map((artist, i) => (
                  <p className={`text-sm text-gray-300 mt-1 font-bold`} key={i}>
                    {artist?.name},
                  </p>
                ))}
              </div>
            ) : (
              <div className="flex capitalize">
                <p className="text-sm text-gray-300 mt-1 font-bold">
                  {songDetails?.artists[0]?.name}
                </p>
              </div>
            )}

            <p className="text-base font-extrabold">-</p>
            <p className="text-sm font-bold">
              {songDetails?.album?.release_date}
            </p>
          </div>
        </div>
      </div>
      {/* Icons */}
      <div className="flex">
        <SongDetailsPlay
          song={songDetails}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePlay={handlePlayClick}
          handlePause={handlePauseClick}
        />
      </div>

      {/* Lyrics */}

      <div className="pl-10 flex space-x-[35%]">
        <div>
          <p className="text-2xl font-bold pb-8">Letra</p>
          {lyrics?.error === true ? (
            <p>Sorry, no lyrics found!</p>
          ) : (
            lyrics?.lines?.map((line, i) => (
              <p className="text-gray-300 m-1" key={i}>
                {line.words}
              </p>
            ))
          )}
        </div>

        <div className="flex h-24">
          <img
            src={artistDetails?.images[0]?.url}
            className="h-24 rounded-full"
          />
          <div className="flex flex-col items-start justify-center p-2">
            <p className="text-sm font-bold uppercase">Artista</p>
            {songDetails?.artists?.length > 1 ? (
              <div className="flex capitalize">
                {songDetails?.artists.map((artist, i) => (
                  <p className={`text-sm text-gray-300 mt-1 font-bold`} key={i}>
                    {artist?.name},
                  </p>
                ))}
              </div>
            ) : (
              <div className="flex capitalize">
                <p className="text-sm text-gray-300 mt-1 font-bold">
                  {songDetails?.artists[0]?.name}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Songs */}
      {/* <div className="pl-10 pt-10 pb-10">
        <RelatedSongs
          data={data}
          artistId={artistId}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePauseClick={handlePauseClick}
          handlePlayClick={handlePlayRelated}
        />
      </div> */}
    </div>
  );
};

export default SongDetails;
