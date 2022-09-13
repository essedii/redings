import { useSelector } from "react-redux";
import { ListingsExcerpt } from "./ListingsExerpt";
import { useGetListingsQuery } from "./listingsSlice";

// import { selectListingIds, selectAllListings } from "./listingsSlice";
const emptyArray = [];

export const Listings = () => {
  const { listings } = useGetListingsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      listings: data ?? emptyArray,
    }),
  });

  return (
    <ul>
      {listings.map((listing) => (
        <div>
          <h1>{listing.title}</h1>
          <h3>{listing.body}</h3>
        </div>
      ))}
    </ul>
  );
};
