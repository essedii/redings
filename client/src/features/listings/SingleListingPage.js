import React from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { useGetListingQuery } from "./listingsSlice";
import { useParams } from "react-router-dom";

export const SingleListingPage = () => {
  const { listingId } = useParams();
  const { _id } = useParams();

  const listing = useGetListingQuery(_id);

  if (!listing) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <section>
      <article>
        <h2>{listing.title}</h2>

        <p className="listing-content">{listing.content}</p>
        <Link to={`/listing/edit/${listingId}`}>Edit Post</Link>
      </article>
    </section>
  );
};
