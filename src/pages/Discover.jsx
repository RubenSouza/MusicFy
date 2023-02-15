import { useSelector } from "react-redux";
import {
  useGetUserTopItemsQuery,
  useGetUserProfileQuery,
  useGetFeaturedPlaylistsQuery,
  useGetNewAlbumsQuery,
  useGetTopTracksQuery,
  useGetTopBrasilQuery,
} from "../redux/services/spotifyApi";

import {
  Error,
  Loader,
  TopPlay,
  AlbumCard,
  PlaylistCard,
  TopTracksCard,
} from "../components";
import { Link } from "react-router-dom";

const Discover = () => {
  const { activeSong, isPlaying } = useSelector(state => state.player);

  const {
    data: topTracks,
    isFetching: isFetchingTopItems,
    error: topItemsError,
  } = useGetUserTopItemsQuery();

  const {
    data: userProfile,
    isFetching: isFetchingUserProfile,
    error: userProfileError,
  } = useGetUserProfileQuery();

  const {
    data: featuredPlaylists,
    isFetching: isFetchingFeatured,
    error: recommendationsError,
  } = useGetFeaturedPlaylistsQuery();

  const {
    data: newAlbums,
    isFetching: isFetchingNewAlbums,
    error: newAlbumsError,
  } = useGetNewAlbumsQuery();

  const {
    data: getTopTracks,
    isFetching: isFetchingTopTracks,
    error: topTracksError,
  } = useGetTopTracksQuery();

  const {
    data: getTopBrasil,
    isFetching: isFetchingBrasil,
    error: topBrasilError,
  } = useGetTopBrasilQuery();

  let newAlbumsDiscover = newAlbums?.albums?.items.slice(0, 8);

  let topTracksDiscover = getTopTracks?.tracks?.items?.slice(0, 8);
  let topTracksData = getTopTracks?.tracks?.items;

  let topBrasilDiscover = getTopBrasil?.tracks?.items?.slice(0, 8);
  let topBrasilData = getTopBrasil?.tracks?.items;

  if (isFetchingNewAlbums || isFetchingTopItems || isFetchingUserProfile) {
    return <Loader title={"Loading"} type={"spinningBubbles"} />;
  }
  if (newAlbumsError || topItemsError || userProfileError || topTracksError) {
    return <Error />;
  }

  return (
    <div
      className="flex flex-col w-full 
    "
    >
      {/* This is the Top Artists Section */}
      <div
        className="bg-gradient-to-b from-[#3a2809]/60 to-[#121212]/50 pt-20
      px-6 "
      >
        <div className="text-white p-3 text-3xl font-bold mb-4 ">
          <h1>Bom dia</h1>
        </div>
        <div className="px-2 max-w-[calc(100vw-17%)]">
          <TopPlay data={topTracks} />
        </div>
      </div>

      {/* //This is the new Albums Section */}
      <div
        className="pt-6 mt-6 px-6 max-w-[calc(100vw-17%)] 
      lg:min-h-[40%] md:min-h-[40%] min-h-[30%] "
      >
        <div className="text-white p-3  mb-4 flex justify-between">
          <h1 className="md:text-1xl lg:text-2xl text-base font-bold">
            Feito para {userProfile?.display_name}
          </h1>
          <p className="text-sm font-bold uppercase text-gray-400 hover:underline hover:cursor-pointer">
            <Link to="/albums">show All</Link>
          </p>
        </div>
        <div className="flex justify-start px-2 gap-5 truncate">
          {newAlbumsDiscover.map((song, i) => {
            return <AlbumCard song={song} key={song.id} />;
          })}
        </div>
      </div>

      {/* This is the Top Tracks Section */}

      <div className="pt-6 px-6 max-w-[calc(100vw-17%)] min-h-[40%] ">
        <div className="text-white p-3  mb-4 flex justify-between">
          <h1 className="md:text-1xl lg:text-2xl text-base font-bold">
            As faixas mais tocadas no mundo
          </h1>
          <p className="text-sm font-bold uppercase text-gray-400 hover:underline hover:cursor-pointer">
            <Link to="/topTracks">show All</Link>
          </p>
        </div>
        <div className="flex justify-start px-2 gap-5 truncate ">
          {topTracksDiscover?.map((song, i) => {
            return (
              <TopTracksCard
                song={song}
                key={song.track?.id}
                isPlaying={isPlaying}
                activeSong={activeSong}
                i={i}
                data={topTracksData}
              />
            );
          })}
        </div>
      </div>

      {/* This is the  Featured Playlists */}

      <div className="pt-6 px-6 max-w-[calc(100vw-17%)] min-h-[40%] ">
        <div className="text-white p-3  mb-4 flex justify-between">
          <h1 className="md:text-1xl lg:text-2xl text-base font-bold">
            Playlists Mais Tocadas
          </h1>
          <p className="text-sm font-bold uppercase text-gray-400 hover:underline hover:cursor-pointer">
            <Link to="/featured">show All</Link>
          </p>
        </div>
        <div className="flex justify-start px-2 gap-5 truncate ">
          {featuredPlaylists?.playlists?.items?.map((song, i) => {
            return <PlaylistCard song={song} key={song.id} />;
          })}
        </div>
      </div>

      {/* This is the Top Brasil Tracks */}

      <div className="pt-6 px-6 max-w-[calc(100vw-17%)] min-h-[40%] ">
        <div className="text-white p-3  mb-4 flex justify-between">
          <h1 className="md:text-1xl lg:text-2xl text-base font-bold">
            As faixas mais tocadas no Brasil
          </h1>
          <p className="text-sm font-bold uppercase text-gray-400 hover:underline hover:cursor-pointer">
            <Link to="/topBrasil">show All</Link>
          </p>
        </div>
        <div className="flex justify-start px-2 gap-5 truncate ">
          {topBrasilDiscover?.map((song, i) => {
            return (
              <TopTracksCard
                song={song}
                key={song.track?.id}
                isPlaying={isPlaying}
                activeSong={activeSong}
                i={i}
                data={topBrasilData}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Discover;
