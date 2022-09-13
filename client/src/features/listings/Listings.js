import React from "react";
import { useSelector } from "react-redux";
import { ListingsExcerpt } from "./ListingsExerpt";
import { useGetListingsQuery } from "./listingsSlice";

import { selectListingIds, selectAllListings } from "./listingsSlice";
const emptyArray = [];

export const Listings = () => {
  // const { listings } = useGetListingsQuery(undefined, {
  //   selectFromResult: ({ data }) => ({
  //     listings: data ?? emptyArray,
  //   }),
  // });

  const listingsIds = useSelector(selectListingIds);

  let content = listingsIds.map((listingId) => (
    <ListingsExcerpt key={listingId} listingId={listingId} />
  ));
  return <section>{content}</section>;
};
