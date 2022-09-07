import { useState } from "react";
import { useDispatch } from "react-redux";

import { addNewListing } from "./listingsSlice";
// import { selectAllUsers } from "../users/usersSlice";
import { useNavigate } from "react-router-dom";

export const AddListing = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // const [userId, setUserId] = useState("");
  // const [addRequestStatus, setAddRequestStatus] = useState("idle");

  //   const users = useSelector(selectAllUsers);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  //   const onAuthorChanged = (e) => setUserId(e.target.value);

  //   const canSave =
  //     [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const onSaveListingClicked = () => {
    // if (canSave) {
    try {
      // setAddRequestStatus("pending");
      // dispatch(addNewPost({ title, body: content })).unwrap();
      dispatch(addNewListing({ title, body: content })).unwrap();

      setTitle("");
      setContent("");
      // setUserId("");
      navigate("/");
    } catch (err) {
      console.error("Failed to save the post", err);
    } finally {
      // setAddRequestStatus("idle");
    }
  };
  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="listingTitle">Listing Title:</label>
        <input
          type="text"
          id="listingTitle"
          name="listingTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="listingAuthor">Author:</label>

        <label htmlFor="listingContent">Content:</label>
        <textarea
          id="listingContent"
          name="listingContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSaveListingClicked}>
          Save Listing
        </button>
      </form>
    </section>
  );
};
