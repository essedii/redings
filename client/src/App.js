import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Layout } from "./components/Layout";
import { Listings } from "./features/listings/Listings";
import { AddListing } from "./features/listings/AddListing";
import UpdateListing from "./features/listings/UpdateListing";
import { SingleListingPage } from "./features/listings/SingleListingPage";
import UserPage from "./features/users/UserPage";

import UsersList from "./features/users/UsersList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Listings />} />

        <Route path="listing">
          <Route index element={<AddListing />} />
          <Route path=":listingId" element={<SingleListingPage />} />
          <Route path=":edit/:listingId" element={<UpdateListing />} />
        </Route>
        <Route path="user">
          <Route index element={<UsersList />} />
          <Route path=":userId" element={<UserPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
