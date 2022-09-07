import { Link } from "react-router-dom";

export const ListingsExcerpt = ({ listing }) => {
  return (
    <article>
      <h2>{listing.title}</h2>
      <p>{listing.body.substring(0, 75)}...</p>
      <h5>{listing.author}</h5>
      <p>
        <Link to={`listing/${listing.id}`}>View Listing</Link>
      </p>
      <div>{listing.tags}</div>
    </article>
  );
};
