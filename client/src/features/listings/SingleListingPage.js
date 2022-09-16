

import { useGetListingQuery, useDeleteListingMutation } from "./listingsApiSlice";
import { useParams,useNavigate } from "react-router-dom";

const SingleListingPage = () => {
  const { listingId } = useParams();
  const {
    data: listing,
    isLoading,
  } = useGetListingQuery(listingId)

  const [deleteListing] = useDeleteListingMutation();
  const navigate = useNavigate();
  if (isLoading) return <div>Loading...</div>
  if (!listing) return <div>Missing post!</div>

  const onDeleteListingClicked = async () => {
        try {
          await deleteListing({ id: listing._id }).unwrap();
    
          navigate("/");
        } catch (err) {
          console.error("Failed to delete the listing", err);
        }
      };

  return (
    <div className="container d-flex justify-content-center">
    <div className="card mb-2" style={{ width: "18rem" }}>
      <div className="card-body">
        <h2 className="card-title">{listing.title}</h2>
        <p className="card-text"> {listing.body}</p>
        <div className="d-flex  justify-content-between">
          <a
            href={"http://localhost:3000/listings/edit/" + listing._id}
            className="btn btn-sm btn-outline-primary"
          >
            Edit Listing
          </a>
          <button
              className="btn btn-sm btn-outline-success"
              type="button"
              onClick={onDeleteListingClicked}
            >
             Delete Listing
            </button>
        </div>
      </div>
    </div>
  </div>
  )
}


export default SingleListingPage;
