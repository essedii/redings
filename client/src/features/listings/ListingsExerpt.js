import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectListingById } from "./listingsSlice";

import { useGetListingQuery } from "./listingsSlice";

export const ListingsExcerpt = ({ listingId }) => {
  const listing = useSelector((state) => selectListingById(state, listingId));
  return (
    <article>
      <h2>{listing.title}</h2>
      <p>{listing.body.substring(0, 75)}...</p>
      <p>
        <Link to={listing._id}>Read More</Link>
      </p>
    </article>
  );
};
