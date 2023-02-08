import React from "react";
import { useParams } from "react-router-dom";
import { useGetSearchQuery } from "../redux/services/spotifyApi";

const SearchQuery = () => {
  const { item: queryItem } = useParams();

  const {
    data: searchQuery,
    isFetching: isFetchingSearchQuery,
    error: searchQueryError,
  } = useGetSearchQuery({ queryItem });

  console.log(searchQuery);

  return (
    <div className="h-screen w-full text-white">
      <h1>Teste</h1>
    </div>
  );
};

export default SearchQuery;
