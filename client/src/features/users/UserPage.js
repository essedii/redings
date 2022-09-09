import { useSelector } from "react-redux";
import { selectUserById } from "../users/usersSlice";

import { Link, useParams } from "react-router-dom";
import { useGetListingsByUserIdQuery } from "../listings/listingsSlice";

const UserPage = () => {
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, Number(userId)));

  const {
    data: listingsForUser,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetListingsByUserIdQuery(userId);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    const { ids, entities } = listingsForUser;
    content = ids.map((id) => (
      <li key={id}>
        <Link to={`/listing/${id}`}>{entities[id].title}</Link>
      </li>
    ));
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <section>
      <h2>{user?.name}</h2>

      <ol>{content}</ol>
    </section>
  );
};

export default UserPage;
