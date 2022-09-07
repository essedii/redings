import { useState } from "react";
import { useDispatch } from "react-redux";

import FileBase from "react-file-base64";

import { addNewListing } from "./listingsSlice";
import { useNavigate } from "react-router-dom";

export const AddListing = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onAuthorChanged = (e) => setAuthor(e.target.value);
  const onTagsChanged = (e) => setTags(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);

  const canSave = addRequestStatus === "idle";

  const onSaveListingClicked = () => {
    if (canSave) {
      try {
        dispatch(
          addNewListing({ title, body: content, author, tags, selectedFile })
        ).unwrap();

        setTitle("");
        setAuthor("");
        setContent("");
        setTags("");
        setSelectedFile("");

        navigate("/");
      } catch (err) {
        console.error("Failed to save the post", err);
      } finally {
        setAddRequestStatus("idle");
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
        <label htmlFor="listingAuthor">Author:</label>

        <input
          type="text"
          id="listingAuthor"
          name="listingAuthor"
          value={author}
          onChange={onAuthorChanged}
        />
        <label htmlFor="listingBody">Body:</label>

        <textarea
          id="listingContent"
          name="listingContent"
          value={content}
          onChange={onContentChanged}
        />

        <label htmlFor="listingTags">Tags:</label>

        <textarea
          id="listingContent"
          name="listingContent"
          value={tags}
          onChange={onTagsChanged}
        />
        <div>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setSelectedFile(base64)}
          />
        </div>

        <button type="button" onClick={onSaveListingClicked}>
          Save Listing
        </button>
      </form>
    </section>
  );
};
