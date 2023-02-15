import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ColorThief from "colorthief";
import { useGetPodcastQuery } from "../redux/services/spotifyApi";
import PodcastBar from "../components/PodcastBar";

const Podcast = () => {
  const { id: podcastId } = useParams();
  const [color, setColor] = useState();

  const {
    data: podcastData,
    isFetching,
    error,
  } = useGetPodcastQuery({
    podcastId,
  });

  let description = podcastData?.html_description?.split("<br/>");

  const colorThief = new ColorThief();
  const img = new Image();
  img.crossOrigin = "Anonymous";
  img.src = podcastData?.images[0]?.url;

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
    <div className="h-screen text-white">
      <div>
        {podcastData && (
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
                src={podcastData?.images[0]?.url}
                className="max-h-60 rounded-sm shadow-[0_-5px_22px_10px_#00000030]"
              />
            </div>
            <div className="flex flex-col">
              <p className="uppercase text-xs font-bold">Playlist</p>
              <h1 className="text-5xl font-bold">{podcastData?.name}</h1>
              <div className="flex items-center space-x-1 pt-6">
                <p className="text-sm font-bold">{podcastData?.publisher}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="p-10 flex flex-row">
        <div>
          <h1 className="text-2xl font-bold">Todos os episódios</h1>
          <div>
            {podcastData?.episodes?.items?.map((song, i) => (
              <PodcastBar song={song} key={i} />
            ))}
          </div>
        </div>
        <div className="ml-16">
          <h1 className="text-2xl font-bold mb-3">Sobre</h1>
          {description?.[0] ? (
            <div>
              {description.map((desc, i) => (
                <p className="text-base text-gray-400 mb-4" key={i}>
                  {desc}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-base text-gray-400 mb-4">
              {podcastData?.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Podcast;
