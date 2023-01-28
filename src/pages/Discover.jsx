import { useSelector } from "react-redux";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import {
  useGetUserTopItemsQuery,
  useGetUserProfileQuery,
  useGetFeaturedPlaylistsQuery,
  useGetNewAlbumsQuery,
  useGetTopTracksQuery,
} from "../redux/services/spotifyApi";

import { Error, Loader, TopPlay, AlbumCard, PlaylistCard } from "../components";
import { Link } from "react-router-dom";

const Discover = () => {
  const { activeSong, isPlaying } = useSelector(state => state.player);

  const { data, isFetching, error } = useGetTopChartsQuery();

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

  console.log(getTopTracks);

  let newAlbumsDiscover = newAlbums?.albums?.items.slice(0, 8);

  if (isFetchingNewAlbums || isFetchingTopItems || isFetchingUserProfile) {
    return <Loader title={"Loading"} type={"spinningBubbles"} />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <div
      className="flex flex-col max-w-full h-screen mb-40
    "
    >
      {/* This is the Top Artists Section */}
      <div
        className="bg-gradient-to-b from-[#3a2809]/60 to-[#121212]/50 pt-6
      px-6 "
      >
        <div className="text-white p-3 text-3xl font-bold mb-4 ">
          <h1>Bom dia</h1>
        </div>
        <div className="px-2 max-w-[calc(100vw-20%)]">
          <TopPlay data={topTracks} />
        </div>
      </div>

      {/* //This is the new Albums Section */}
      <div className="pt-6 mt-6 px-6 max-w-[calc(100vw-20%)] lg:min-h-[40%] md:min-h-[40%] min-h-[30%] truncate">
        <div className="text-white p-3  mb-4 flex justify-between">
          <h1 className="md:text-1xl lg:text-2xl text-base font-bold">
            Feito para {userProfile?.display_name}
          </h1>
          <p className="text-sm font-bold uppercase text-gray-400 hover:underline hover:cursor-pointer">
            <Link to="/albums">show All</Link>
          </p>
        </div>
        <div className="flex justify-start px-2 gap-5 ">
          {newAlbumsDiscover.map((song, i) => {
            return <AlbumCard song={song} key={song.id} />;
          })}
        </div>
      </div>

      {/* This is the  Featured Playlists */}

      <div className="pt-6 px-6 max-w-[calc(100vw-20%)] min-h-[40%] truncate">
        <div className="text-white p-3  mb-4 flex justify-between">
          <h1 className="md:text-1xl lg:text-2xl text-base font-bold">
            Playlists Mais Tocadas
          </h1>
          <p className="text-sm font-bold uppercase text-gray-400 hover:underline hover:cursor-pointer">
            <Link to="/featured">show All</Link>
          </p>
        </div>
        <div className="flex justify-start px-2 gap-5 ">
          {featuredPlaylists?.playlists?.items?.map((song, i) => {
            return <PlaylistCard song={song} key={song.id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Discover;
