import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ListingsExcerpt } from "./ListingsExerpt";

import {
  selectListingIds,
  getListingsStatus,
  getListingsError,
  fetchListings,
} from "./listingsSlice";

export const Listings = () => {
  // const listings = useSelector(selectAllListings);
  const orderedListingIds = useSelector(selectListingIds);

  const listingStatus = useSelector(getListingsStatus);
  const error = useSelector(getListingsError);

  let content;
  if (listingStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (listingStatus === "succeeded") {
    // const orderedListings = listings
    //   .slice()
    //   .sort((a, b) => b.date.localeCompare(a.date));
    // content = orderedListings.map((listing) => (
    //   <ListingsExcerpt key={listing.id} listing={listing} />
    // ));
    content = orderedListingIds.map((listingId) => (
      <ListingsExcerpt key={listingId} listingId={listingId} />
    ));
  } else if (listingStatus === "failed") {
    content = <div>{error}</div>;
  }

  return <section>{content}</section>;
};
