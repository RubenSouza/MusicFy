import DiscoverArtist from "./DiscoverArtist";

const TopPlay = ({ data }) => {
  const topPlays = data?.items.slice(0, 6);

  return (
    <div
      className="flex flex-wrap justify-start gap-4 
    "
    >
      {topPlays.map((artist, i) => (
        <DiscoverArtist artist={artist} key={artist.id} i={i} />
      ))}
    </div>
  );
};

export default TopPlay;
