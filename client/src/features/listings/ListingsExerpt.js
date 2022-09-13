import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import { useGetListingQuery } from "./listingsSlice";

export const ListingsExcerpt = ({ _id }) => {
  const listing = useGetListingQuery(_id);
  return (
    <article>
      <h2>{listing.title}</h2>
      <p>{listing.body.substring(0, 75)}...</p>
      <h5>{listing.author}</h5>
      <p>
        <Link to={listing._id}>View Listing</Link>
      </p>
      <div>{listing.tags}</div>
    </article>
  );
};
