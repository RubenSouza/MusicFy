import { useGetArtistQuery } from "../redux/services/spotifyApi";

const ArtistDetails = () => {
  const {
    data: artistDetails,
    isFetching: isFetchingArtistDetails,
    error: artistDetailsError,
  } = useGetArtistQuery({ artistId });

  return <div>ArtistDetails</div>;
};

export default ArtistDetails;
