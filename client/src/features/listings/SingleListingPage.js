import React from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { selectListingById } from "./listingsSlice";
import { useParams } from "react-router-dom";

export const SingleListingPage = () => {
  const { listingId } = useParams();
  const { _id } = useParams();

  const listing = useSelector((state) => selectListingById(state, listingId));

  if (!listing) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <div className="container d-flex justify-content-center">
      <div className="card mb-2" style={{ width: "18rem" }}>
        <div className="card-body">
          <h2 className="card-title">{listing.title}</h2>
          <p className="card-text"> {listing.body}</p>

          <div className="d-flex  justify-content-between">
            <a
              href={"http://localhost:3000/listing/edit/" + listing._id}
              className="btn btn-sm btn-outline-primary"
            >
              Edit Listing
            </a>
            <a
              href={"http://localhost:3000/listing/" + listing._id}
              className="btn btn-sm btn-outline-primary"
            >
              Delete Listing
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
