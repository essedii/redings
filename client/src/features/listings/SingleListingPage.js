import {
  useGetListingQuery,
  useDeleteListingMutation,
} from "./listingsApiSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { setCredentials } from "../auth/authSlice";

const SingleListingPage = () => {
  const { listingId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deleteListing] = useDeleteListingMutation();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const {
    data: listing,
    isFetching,
    isSuccess,
  } = useGetListingQuery(listingId);

  useEffect(() => {
    dispatch(setCredentials({ token: token, username: username }));
  });

  const onDeleteListingClicked = async () => {
    try {
      await deleteListing({ id: listing._id }).unwrap();

      navigate("/");
    } catch (err) {
      console.error("Failed to delete the listing", err);
    }
  };
  let content;
  if (isFetching) {
    content = <div>Loading...</div>;
  }
  if (!listing) {
    content = <div>Listing not found!</div>;
  } else if (isSuccess) {
    content = (
      <div className="container d-flex justify-content-center">
        <div className="card mb-2" style={{ width: "18rem", backgroundColor: 'whitesmoke'}}>
          <div className="card-body">
            <h2 className="card-title ">{listing.title}</h2>
            <p className="card-text"> {listing.body}</p>
            <div className="d-flex  justify-content-between">
              <a
                href={"http://localhost:3000/listings/edit/" + listing._id}
                className="btn btn-sm btn-secondary"
              >
                Edit Listing
              </a>
              <button
                className="btn btn-sm btn-danger"
                type="button"
                onClick={onDeleteListingClicked}
              >
                Delete Listing
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <section>{content}</section>;
};

export default SingleListingPage;
