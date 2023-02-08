import { useState, useEffect } from "react";
import ColorThief from "colorthief";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Error, Loader, SongDetailsPlay } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import {
  useGetSongQuery,
  useGetArtistQuery,
  useGetTopTracksQuery,
} from "../redux/services/spotifyApi";

const SongDetails = () => {
  let { id: songId } = useParams();
  const [color, setColor] = useState();
  const [lyrics, setLyrics] = useState();
  const { activeSong, isPlaying } = useSelector(state => state.player);

  const {
    data: songDetails,
    isFetching: isFetchingSongDetails,
    error: songDetailsError,
  } = useGetSongQuery({ songId });

  let artistId = songDetails?.artists?.[0]?.id;

  const {
    data: getTopTracks,
    isFetching: isFetchingTopTracks,
    error: topTracksError,
  } = useGetTopTracksQuery();

  let song = songDetails;
  let data = getTopTracks?.tracks?.items;

  const {
    data: artistDetails,
    isFetching: isFetchingArtistDetails,
    error: artistDetailsError,
  } = useGetArtistQuery({ artistId });

  const dispatch = useDispatch();

  const colorThief = new ColorThief();
  const img = new Image();
  img.crossOrigin = "Anonymous";
  img.src = songDetails?.album?.images?.[0]?.url;

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

    img.onload = () => {
      const color = colorThief.getColor(img);

      const rgbToHex = (r, g, b) =>
        "#" +
        [r, g, b]
          .map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
          })
          .join("");

      setColor(rgbToHex(color[0], color[1], color[2]));
    };
  }, [img.src]);

  //Errors

  if (isFetchingSongDetails && isFetchingArtistDetails) {
    return <Loader title={"Loading"} type={"spinningBubbles"} />;
  }
  if (songDetailsError && artistDetailsError) {
    return <Error />;
  }

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  //
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data }));
    dispatch(playPause(true));
  };

  return (
    <div className="text-white w-full bg-red h-screen ">
      {/* Header */}
      {songDetails && (
        <div
          className="flex items-end w-full h-[400px] px-10 space-x-6 "
          style={{
            backgroundImage: `linear-gradient(180deg, ${color} 0%, rgba(0, 0, 0, 0) 100%)`,
            backgroundPosition: "25% -15%",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
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
                    <p
                      className={`text-sm text-gray-300 mt-1 font-bold`}
                      key={i}
                    >
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
      )}
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

      <div className="pl-10 flex flex-col lg:flex-row lg:space-x-[35%]">
        <div>
          <p className="text-2xl font-bold pb-8">Letra</p>
          {lyrics?.error === true ? (
            <p>Sorry, no lyrics found!</p>
          ) : (
            lyrics?.lines?.map((line, i) => (
              <p className="text-gray-300 m-1" key={i}>
                {line?.words}
              </p>
            ))
          )}
        </div>

        <div className="flex h-24">
          <img
            src={artistDetails?.images?.[0]?.url}
            className="h-24 rounded-full"
          />
          <div className="flex flex-col items-start justify-center p-2">
            <p className="text-sm font-bold uppercase">Artista</p>
            {songDetails?.artists?.length > 1 ? (
              <div className="flex capitalize">
                {songDetails?.artists?.map((artist, i) => (
                  <p className={`text-sm text-gray-300 mt-1 font-bold`} key={i}>
                    {artist?.name},
                  </p>
                ))}
              </div>
            ) : (
              <div className="flex capitalize">
                <p className="text-sm text-gray-300 mt-1 font-bold">
                  {songDetails?.artists?.[0]?.name}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongDetails;
