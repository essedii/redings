import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ListingsExcerpt } from "./ListingsExerpt";

import {
  selectAllListings,
  getListingsStatus,
  getListingsError,
  fetchListings,
} from "./listingsSlice";

export const Listings = () => {
  const listings = useSelector(selectAllListings);
  const listingStatus = useSelector(getListingsStatus);
  const error = useSelector(getListingsError);

  let content = "";

  if (listingStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (listingStatus === "succeeded") {
    content = listings.map((listing) => (
      <ListingsExcerpt key={listing.id} listing={listing} />
    ));
  } else if (listingStatus === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <section>
      <h2>Listings</h2>
      {content}
    </section>
  );
};
