import { useState } from "react";
import { useSelector } from "react-redux";
import { selectListingById } from "./listingsSlice";

// import FileBase from "react-file-base64";

import { useParams, useNavigate } from "react-router-dom";
import {
  useUpdateListingMutation,
  useDeleteListingMutation,
} from "./listingsSlice";

export const UpdateListing = () => {
  let { _id } = useParams();
  const poor_id = window.location.href.slice(35);

  const navigate = useNavigate();

  const [updateListing, { isLoading }] = useUpdateListingMutation();
  const [deleteListing] = useDeleteListingMutation();

  const listing = useSelector((state) => selectListingById(state, _id));

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
  // const onAuthorChanged = (e) => setUserId(e.target.value);

  const canSave = [title, content].every(Boolean) && !isLoading;

  const onSaveListingClicked = async () => {
    if (canSave) {
      try {
        await updateListing({
          title: title,
          body: content,
          _id: poor_id,
        }).unwrap();

        setTitle("");
        setContent("");
        // setUserId("");
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
    <section>
      <h2>Edit Listing</h2>
      <h1>{poor_id}</h1>
      <form autoComplete="off">
        <label htmlFor="listingTitle">Listing Title:</label>
        <input
          type="text"
          id="listingTitle"
          name="listingTitle"
          value={title}
          placeholder={listing.title}
          onChange={onTitleChanged}
        />
        <label htmlFor="listingAuthor">Content:</label>

        {/* <input
          type="text"
          id="listingAuthor"
          name="listingAuthor"
          value={author}
          onChange={onAuthorChanged}
        />
        <label htmlFor="listingBody">Body:</label> */}

        <textarea
          id="listingContent"
          name="listingContent"
          placeholder={listing.body}
          value={content}
          onChange={onContentChanged}
        />

        {/* <label htmlFor="listingTags">Tags:</label> */}
        {/* 
        <textarea
          id="listingContent"
          name="listingContent"
          value={tags}
          onChange={onTagsChanged}
        /> */}
        {/* <div>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setSelectedFile(base64)}
          />
        </div> */}
        <button
          className="deleteButton"
          type="button"
          onClick={onDeleteListingClicked}
        >
          Delete Post
        </button>
        <button type="button" onClick={onSaveListingClicked}>
          Update Listing
        </button>
      </form>
    </section>
  );
};
