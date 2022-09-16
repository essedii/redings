import React from "react";

import ListingsExcerpt from "./ListingsExerpt";
import { useGetListingsQuery } from "./listingsApiSlice";

const Listings = () => {
  const { data: listings } = useGetListingsQuery();
  const { isLoading, isSuccess, isError, error } = useGetListingsQuery();

  let content;

  if (isLoading) {
    content = <p text="Loading..." />;
  } else if (isSuccess) {
    content = listings.map((listing) => (
      <div className="container d-flex justify-content-center ">
        <ListingsExcerpt key={listing._id} listing={listing} />
      </div>
    ));
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return <section>{content}</section>;
};

export default Listings;
