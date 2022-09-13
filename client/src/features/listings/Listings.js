import React from "react";
import { useSelector } from "react-redux";
import { ListingsExcerpt } from "./ListingsExerpt";
import { useGetListingsQuery } from "./listingsSlice";

import { selectListingIds, selectAllListings } from "./listingsSlice";

export const Listings = () => {
  // const { listings } = useGetListingsQuery(undefined, {
  //   selectFromResult: ({ data }) => ({
  //     listings: data ?? emptyArray,
  //   }),
  // });
  const { isLoading, isSuccess, isError, error } = useGetListingsQuery();

  const listingsIds = useSelector(selectListingIds);

  let content;

  if (isLoading) {
    content = <p text="Loading..." />;
  } else if (isSuccess) {
    content = listingsIds.map((listingId) => (
      <div className="container d-flex justify-content-center">
        <ListingsExcerpt key={listingId} listingId={listingId} />
      </div>
    ));
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return <section>{content}</section>;
};
