import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const spotifyApi = createApi({
  reducerPath: "spotifyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.spotify.com/v1",
    prepareHeaders: headers => {
      headers.set(
        "Authorization",
        `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type",
        "application/json"
      );

      return headers;
    },
  }),
  endpoints: builder => ({
    getUserProfile: builder.query({
      query: () => "/me",
    }),
    getUserPlaylists: builder.query({
      query: () => "/me/playlists?limit=50",
    }),
    getUserTopItems: builder.query({
      query: () => "/me/top/artists",
    }),
    getFeaturedPlaylists: builder.query({
      query: () => `/browse/featured-playlists`,
    }),
    getNewAlbums: builder.query({
      query: () => `/browse/new-releases`,
    }),
    getPlaylist: builder.query({
      query: ({ playlistId }) => `/playlists/${playlistId}`,
    }),
    getPlayPause: builder.query({
      query: ({ playlistId }) =>
        `/me/player/play?context_uri:"spotify:playlist:${playlistId}"`,
    }),
    getAlbum: builder.query({
      query: ({ albumId }) => `/albums/${albumId}`,
    }),
  }),
});

export const {
  useGetUserPlaylistsQuery,
  useGetUserProfileQuery,
  useGetUserTopItemsQuery,
  useGetFeaturedPlaylistsQuery,
  useGetNewAlbumsQuery,
  useGetPlaylistQuery,
  useGetPlayPauseQuery,
  useGetAlbumQuery,
} = spotifyApi;

// `/recommendations?seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical&seed_tracks=0c6xIDDpzE81m2q797ordA&limit=10`
