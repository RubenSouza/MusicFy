import { useSelector } from "react-redux";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import {
  useGetUserTopItemsQuery,
  useGetUserProfileQuery,
  useGetFeaturedPlaylistsQuery,
  useGetNewAlbumsQuery,
} from "../redux/services/spotifyApi";
import SongCard from "../components/SongCard";
import { Error, Loader, TopPlay } from "../components";

const Discover = () => {
  // const { activeSong, isPlaying } = useSelector(state => state.player);

  let activeSong, isPlaying;

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
    isFetching: isFetchingRecommendations,
    error: recommendationsError,
  } = useGetFeaturedPlaylistsQuery();

  const {
    data: newAlbums,
    isFetching: isFetchingNewAlbums,
    error: newAlbumsError,
  } = useGetNewAlbumsQuery();

  // console.log(newAlbums);

  if (isFetching) {
    return <Loader title={"Loading"} type={"spinningBubbles"} />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <div
      className="flex flex-col relative w-full

    "
    >
      <div
        className="bg-gradient-to-b from-[#3a2809]/60 to-[#121212]/50 pt-6
      px-6  "
      >
        <div className="text-white p-3 text-3xl font-bold mb-4 ">
          <h1>Bom dia</h1>
        </div>
        <div className="px-2 w-full ">
          <TopPlay data={topTracks} />
        </div>
      </div>
      {/* // This is the shazam section */}

      {/* <div className="pt-6 px-6">
        <div className="text-white p-3 text-3xl font-bold mb-4">
          <h1>Top Musics</h1>
        </div>
        <div className="flex flex-wrap justify-start px-6 gap-8">
          {data?.map((song, i) => {
            return (
              <SongCard
                song={song}
                key={song.key}
                i={i}
                isPlaying={isPlaying}
                activeSong={activeSong}
                data={data}
              />
            );
          })}
        </div>
      </div> */}

      {/* //This is the spotify section */}
      <div className="pt-6 px-6">
        <div className="text-white p-3 text-2xl font-bold mb-4">
          <h1>Feito para {userProfile?.display_name}</h1>
        </div>
        <div className="flex flex-wrap justify-start px-2 gap-5">
          {data?.map((song, i) => {
            return (
              <SongCard
                song={song}
                key={song.key}
                i={i}
                isPlaying={isPlaying}
                activeSong={activeSong}
                data={data}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Discover;
