import { Link, useParams } from "react-router-dom";
import {
  useGetArtistAlbumsQuery,
  useGetArtistQuery,
  useGetArtistTopTracksQuery,
} from "../redux/services/spotifyApi";
import ColorThief from "colorthief";
import { useState } from "react";
import { useEffect } from "react";
import SongBar3 from "../components/SongBar3 ";
import { useDispatch, useSelector } from "react-redux";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { ClockIcon } from "@heroicons/react/24/solid";
import { AlbumCard } from "../components";

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const [color, setColor] = useState();

  const { activeSong, isPlaying } = useSelector(state => state.player);

  const dispatch = useDispatch();

  const {
    data: artistDetails,
    isFetching: isFetchingArtistDetails,
    error: artistDetailsError,
  } = useGetArtistQuery({ artistId });

  const {
    data: artistTopTracks,
    isFetching: isFetchingArtistTopTracks,
    error: artistTopTracksError,
  } = useGetArtistTopTracksQuery({ artistId });

  let data = artistTopTracks?.tracks;

  const {
    data: artistAlbums,
    isFetching: isFetchingArtistAlbums,
    error: artistAlbumsError,
  } = useGetArtistAlbumsQuery({ artistId });

  let artistAlbumsDiscover = artistAlbums?.items?.slice(0, 8);

  console.log(artistAlbums);

  const handlePause = () => {
    dispatch(playPause(false));
  };

  const handlePlay = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  const colorThief = new ColorThief();
  const img = new Image();
  img.crossOrigin = "Anonymous";
  img.src = artistDetails?.images[0]?.url;

  // Make sure image is finished loading

  useEffect(() => {
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

  return (
    <div className={`flex flex-col h-screen text-white`}>
      {artistDetails && (
        <div
          className="flex justify-start items-end overflow-hidden min-h-[400px]"
          style={{
            backgroundImage: `linear-gradient(180deg, ${color} 0%, rgba(0, 0, 0, 0) 100%)`,
            backgroundPosition: "25% -15%",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="px-10">
            <img
              src={artistDetails?.images[0]?.url}
              alt="artist"
              className="w-[200px] h-[200px] object-cover rounded-full shadow-xl 
             border-2 border-slate-300 "
            />
          </div>
          <div className="flex flex-col items-start -space-y-6">
            <h1 className="text-md font-bold">Artist</h1>
            <h1 className="text-[4.5vw] font-bold flex-wrap">
              {artistDetails?.name}
            </h1>
            <p className="text-base">{`${(artistDetails?.followers?.total).toLocaleString(
              "pt-BR"
            )} Seguidores`}</p>
          </div>
        </div>
      )}

      <div className="mt-10">
        <h1 className="text-2xl font-bold py-8 px-10">Top Tracks</h1>
        <table
          className=" text-gray-400 font-mono w-[84%] ml-10
text-left text-base"
        >
          <thead className="uppercase">
            <tr>
              <th>#</th>
              <th>Título</th>
              <th>Álbum</th>
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
            {artistTopTracks?.tracks.map((track, i) => (
              <SongBar3
                song={track}
                i={i}
                key={i}
                AlbumData={data}
                handlePlay={handlePlay}
                handlePause={handlePause}
                activeSong={activeSong}
                isPlaying={isPlaying}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-10 px-10 max-w-[calc(100vw-16%)] pb-24">
        <div className="relative flex justify-between w-[98%]">
          <h1 className="text-2xl font-bold pb-8">Albums</h1>
          <p className="text-sm font-bold uppercase text-gray-400 hover:underline hover:cursor-pointer">
            <Link to={`/artists/albums/${artistId}`}>show All</Link>
          </p>
        </div>
        <div className="flex justify-start px-2 gap-5 truncate">
          {artistAlbumsDiscover?.map((album, i) => (
            <AlbumCard song={album} key={album.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistDetails;
