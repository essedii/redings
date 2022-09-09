import React from "react";
import { useSelector } from "react-redux";
import { ListingsExcerpt } from "./ListingsExerpt";
import { useGetListingsQuery } from "./listingsSlice";

import { selectListingIds } from "./listingsSlice";

export const Listings = () => {
  const { isLoading, isSuccess, isError, error } = useGetListingsQuery();

  // const listings = useSelector(selectAllListings);
  const orderedListingIds = useSelector(selectListingIds);

  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    // const orderedListings = listings
    //   .slice()
    //   .sort((a, b) => b.date.localeCompare(a.date));
    // content = orderedListings.map((listing) => (
    //   <ListingsExcerpt key={listing.id} listing={listing} />
    // ));
    content = orderedListingIds.map((listingId) => (
      <ListingsExcerpt key={listingId} listingId={listingId} />
    ));
  } else if (isError) {
    content = <div>{error}</div>;
  }

  return <section>{content}</section>;
};
