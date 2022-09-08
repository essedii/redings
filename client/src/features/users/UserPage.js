import { useSelector } from "react-redux";
import { selectUserById } from "../users/usersSlice";
import {
  selectAllListings,
  selectListingsByUser,
} from "../listings/listingsSlice";
import { Link, useParams } from "react-router-dom";

const UserPage = () => {
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, Number(userId)));

  const listingsForUser = useSelector((state) => {
    // const allListings = selectAllListings(state);
    // return allListings.filter((listing) => listing.userId === Number(userId));
    selectListingsByUser(state, Number(userId));
  });

  const listingTitles = listingsForUser.map((listing) => (
    <li key={listing.id}>
      <Link to={`/listing/${listing.id}`}>{listing.title}</Link>
    </li>
  ));

  return (
    <section>
      <h2>{user?.name}</h2>

      <ol>{listingTitles}</ol>
    </section>
  );
};

export default UserPage;
