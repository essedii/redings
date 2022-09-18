import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useAddNewListingMutation } from "./listingsApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../auth/authSlice";

const AddListing = () => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const location = useLocation();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [addNewListing, { isLoading }] = useAddNewListingMutation();
  const canSave = [title, content].every(Boolean) && !isLoading;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);

  useEffect(() => {
    dispatch(setCredentials({ token: token, username: username }));
  });

  const onSaveListingClicked = async () => {
    if (canSave) {
      try {
        await addNewListing({ title, body: content }).unwrap();
        setTitle("");
        setContent("");
        navigate("/listings");
      } catch (err) {
        console.error("Failed to save the post", err);
      }
    }
  };
  return token ? (
    <div>
      <h3 className="ms-2 mt-2">Create Listing</h3>
      <div className="container d-flex justify-content-center">
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
              disabled={!canSave}
            >
              Save Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <Navigate to="/listings" state={{ from: location }} replace />
  );
};

export default AddListing;
