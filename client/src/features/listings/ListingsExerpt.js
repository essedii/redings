import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectListingById } from "./listingsApiSlice";
import { useGetListingQuery } from "./listingsApiSlice";

const ListingsExcerpt = ({ listing }) => {
  return (
    <div className="card mb-2" style={{ width: "18rem" }}>
      <div className="card-body">
        <h2 className="card-title">{listing.title}</h2>
        <p className="card-text"> {listing.body.substring(0, 75)}...</p>
        <a
          href={"http://localhost:3000/listings/" + listing._id}
          className="btn btn-sm btn-outline-primary"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default ListingsExcerpt;
