import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "../features/api/apiSlice";

export const store = configureStore({
  reducer: {
    //Dynamic name
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
