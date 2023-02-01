import { configureStore } from "@reduxjs/toolkit";

import playerReducer from "./features/playerSlice";
import topButtonsReducer from "./features/topButtons";
import { shazamCoreApi } from "./services/shazamCore";
import { spotifyApi } from "./services/spotifyApi";

export const store = configureStore({
  reducer: {
    [spotifyApi.reducerPath]: spotifyApi.reducer,
    player: playerReducer,
    topButtons: topButtonsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(shazamCoreApi.middleware)
      .concat(spotifyApi.middleware),
});
