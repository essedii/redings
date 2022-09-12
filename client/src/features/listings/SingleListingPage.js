import React from "react";
import { useSelector } from "react-redux";

import { selectListingById } from "./listingsSlice";

import { useParams } from "react-router-dom";

export const SingleListingPage = () => {
  const { _id } = useParams();

  const listing = useSelector((state) => selectListingById(state, _id));

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
      </article>
    </section>
  );
};
