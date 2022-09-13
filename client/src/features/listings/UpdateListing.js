import { useState } from "react";
import { useSelector } from "react-redux";
import { selectListingById } from "./listingsSlice";

import { useParams, useNavigate } from "react-router-dom";
import {
  useUpdateListingMutation,
  useDeleteListingMutation,
} from "./listingsSlice";

export const UpdateListing = () => {
  let { listingId } = useParams();
  let { _id } = useParams();

  const navigate = useNavigate();

  const [updateListing, { isLoading }] = useUpdateListingMutation();
  const [deleteListing] = useDeleteListingMutation();

  const listing = useSelector((state) => selectListingById(state, listingId));

  const [title, setTitle] = useState(listing?.title);
  const [content, setContent] = useState(listing?.body);

  if (!listing) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);

  const canSave = [title, content].every(Boolean) && !isLoading;

  const onSaveListingClicked = async () => {
    if (canSave) {
      try {
        await updateListing({
          title: title,
          body: content,
          _id: listingId,
        }).unwrap();

        setTitle("");
        setContent("");

        navigate("/listings/listingId");
      } catch (err) {
        console.error("Failed to update the post", err);
      }
    }
  };

  const onDeleteListingClicked = async () => {
    try {
      await deleteListing({ id: listing._id }).unwrap();

      setTitle("");
      setContent("");
      navigate("/");
    } catch (err) {
      console.error("Failed to delete the listing", err);
    }
  };
  return (
    <div>
      <h3 className="ms-2 mt-2">Edit Listing</h3>
      <div className="container d-flex justify-content-center">
        {/* <h1>{listingId}</h1> */}
        <form autoComplete="off">
          <label className="form-label" htmlFor="listingTitle">
            Title:
          </label>
          <input
            className="form-control mb-3"
            type="text"
            id="listingTitle"
            name="listingTitle"
            value={title}
            placeholder={listing.title}
            onChange={onTitleChanged}
          />
          <label className="form-label" htmlFor="listingAuthor">
            Content:
          </label>

          <textarea
            className="form-control"
            style={{ height: "100px" }}
            id="listingContent"
            name="listingContent"
            placeholder={listing.body}
            value={content}
            onChange={onContentChanged}
          />
          <div
            className="d-flex justify-content-between mt-3"
            style={{ width: "300px" }}
          >
            <button
              className="btn btn-sm btn-outline-success"
              type="button"
              onClick={onSaveListingClicked}
            >
              Save Listing
            </button>

            <button
              className="btn btn-sm btn-outline-danger"
              type="button"
              onClick={onDeleteListingClicked}
            >
              Delete Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
