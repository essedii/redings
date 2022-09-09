import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { Provider } from "react-redux";
import { store } from "./app/store";
// import { fetchListings } from "./features/listings/listingsSlice";
import { extendedApiSlice } from "./features/listings/listingsSlice";
import { usersApiSlice } from "./features/users/usersSlice";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { fetchUsers } from "./features/users/usersSlice";

store.dispatch(extendedApiSlice.endpoints.getListings.initiate());
store.dispatch(usersApiSlice.endpoints.getUsers.initiate());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </Router>
  </Provider>
);
