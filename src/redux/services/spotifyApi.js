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
    getUserFavorites: builder.query({
      query: () => "/me/tracks?limit=50",
    }),
    getUserPodcasts: builder.query({
      query: () => "/me/shows?limit=50",
    }),
    getUserAlbums: builder.query({
      query: () => "/me/albums?limit=50",
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
    getTopTracks: builder.query({
      query: () => `/playlists/37i9dQZEVXbNG2KDcFcKOF`,
    }),
    getTopBrasil: builder.query({
      query: () => `/playlists/37i9dQZEVXbKzoK95AbRy9`,
    }),
    getPlayPause: builder.query({
      query: ({ playlistId }) =>
        `/me/player/play?context_uri:"spotify:playlist:${playlistId}"`,
    }),
    getAlbum: builder.query({
      query: ({ albumId }) => `/albums/${albumId}`,
    }),
    getSong: builder.query({
      query: ({ songId }) => `/tracks/${songId}`,
    }),
    getArtist: builder.query({
      query: ({ artistId }) => `/artists/${artistId}`,
    }),
  }),
});

export const {
  useGetUserPlaylistsQuery,
  useGetUserProfileQuery,
  useGetUserTopItemsQuery,
  useGetUserFavoritesQuery,
  useGetFeaturedPlaylistsQuery,
  useGetNewAlbumsQuery,
  useGetPlaylistQuery,
  useGetPlayPauseQuery,
  useGetAlbumQuery,
  useGetTopTracksQuery,
  useGetTopBrasilQuery,
  useGetSongQuery,
  useGetArtistQuery,
  useGetUserPodcastsQuery,
  useGetUserAlbumsQuery,
} = spotifyApi;
