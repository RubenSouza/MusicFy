import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GenderCard } from "../components";
import { setIsSearch } from "../redux/features/topButtons";
import { useGetSeveralCategoriesQuery } from "../redux/services/spotifyApi";

const Search = () => {
  const { data, error, isLoading } = useGetSeveralCategoriesQuery();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsSearch(true));

    return () => {
      dispatch(setIsSearch(false));
    };
  }, []);

  return (
    <div>
      <div className="h-screen w-full p-10 pt-16">
        <div className="text-white p-3  mb-4 flex justify-between">
          <h1 className="text-2xl font-bold">Genders e Moods</h1>
        </div>
        <div className="flex justify-start gap-5 flex-wrap">
          {data?.categories?.items?.map((category, i) => {
            return <GenderCard category={category} key={i} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Search;
