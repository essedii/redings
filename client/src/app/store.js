import { configureStore } from "@reduxjs/toolkit";

import listingsReducer from "../features/listings/listingsSlice";
import usersReducer from "../features/users/usersSlice";

export const store = configureStore({
  reducer: {
    listings: listingsReducer,
    users: usersReducer,
  },
});
