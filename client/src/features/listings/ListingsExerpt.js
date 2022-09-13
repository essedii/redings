import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectListingById } from "./listingsSlice";

import { useGetListingQuery } from "./listingsSlice";

export const ListingsExcerpt = ({ listingId }) => {
  const listing = useSelector((state) => selectListingById(state, listingId));
  return (
    <div className="card mb-2" style={{ width: "18rem" }}>
      <div className="card-body">
        <h2 className="card-title">{listing.title}</h2>
        <p className="card-text"> {listing.body.substring(0, 75)}...</p>
        <a
          href={"http://localhost:3000/listing/" + listing._id}
          className="btn btn-sm btn-outline-primary"
        >
          {/* <Link to={listing._id}>Read More</Link> */}
          Read More
        </a>
      </div>
    </div>
  );
};
