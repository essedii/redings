import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEditListingMutation, useGetListingQuery } from "./listingsApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../auth/authSlice";

const EditListing = () => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const { listingId } = useParams();
  // const oldListing = useGetListingQuery(listingId)

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const {
    data: oldListing,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetListingQuery(listingId);
  const [editListing] = useEditListingMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);

  useEffect(() => {
    dispatch(setCredentials({ token: token, username: username }));
  });

  const onSaveListingClicked = async () => {
    let content;
    if (isLoading) {
      content = <p text="Loading..." />;
    } else if (isSuccess) {
      try {
        await editListing({ title: title, body: content, _id: listingId }).unwrap();
        setTitle("");
        setContent("");
        navigate("/listings");
      } catch (err) {
        console.error("Failed to save the post", err);
      }
    } else if (isError) {
      content = <p>{error}</p>;
    }
  };
  return (
    <div>
      <div
        className=" d-flex align-items-center flex-column "

      >
        <h3 className="ms-2 mt-2">Edit Listing</h3>
        <div className="container d-flex flex-column justify-content-center" style={{ width: "20rem", backgroundColor: "whitesmoke" }}>
          <form autoComplete="off">
            <label className="form-label mt-3" htmlFor="listingTitle">
              Title:
            </label>
            <input
              className="form-control mb-3"
              type="text"
              id="listingTitle"
              name="listingTitle"
              value={title}
              placeholder={oldListing?.title}
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
              placeholder={oldListing?.body}
              onChange={onContentChanged}
            />
            <div
              className="d-flex justify-content-between mt-3"
              style={{ width: "300px" }}
            >
              <button
                className="btn btn-sm btn-success mb-3 mt-2"
                type="button"
                onClick={onSaveListingClicked}
              >
                Save Listing
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditListing;
