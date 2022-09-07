import React from "react";
import { Routes, Route } from "react-router-dom";

import { Layout } from "./components/Layout";

import { Listings } from "./features/listings/Listings";
import { AddListing } from "./features/listings/AddListing";
import { SingleListingPage } from "./features/listings/SingleListingPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Listings />} />

        <Route path="listing">
          <Route index element={<AddListing />} />
          <Route path=":listingId" element={<SingleListingPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
