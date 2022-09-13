import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAddNewListingMutation } from "./listingsSlice";

export const AddListing = () => {
  const [addNewListing, { isLoading }] = useAddNewListingMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  // const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  // const [userId, setUserId] = useState("");

  // const [tags, setTags] = useState("");
  // const [selectedFile, setSelectedFile] = useState("");

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  // const onAuthorChanged = (e) => setUserId(e.target.value);

  const canSave = [title, content].every(Boolean) && !isLoading;

  const onSaveListingClicked = async () => {
    if (canSave) {
      try {
        await addNewListing({ title, body: content }).unwrap();

        setTitle("");
        setContent("");
        // setUserId("");
        navigate("/");
      } catch (err) {
        console.error("Failed to save the post", err);
      }
    }
  };
  return (
    <section>
      <h2>Add a Listing</h2>
      <form autoComplete="off">
        <label htmlFor="listingTitle">Listing Title:</label>
        <input
          type="text"
          id="listingTitle"
          name="listingTitle"
          value={title}
          onChange={onTitleChanged}
        />
        {/* <label htmlFor="listingAuthor">Author:</label>

        <input
          type="text"
          id="listingAuthor"
          name="listingAuthor"
          value={author}
          onChange={onAuthorChanged}
        /> */}
        <label htmlFor="listingBody">Body:</label>

        <textarea
          id="listingContent"
          name="listingContent"
          value={content}
          onChange={onContentChanged}
        />

        <label htmlFor="listingTags">Tags:</label>
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

        <button type="button" onClick={onSaveListingClicked}>
          Save Listing
        </button>
      </form>
    </section>
  );
};
