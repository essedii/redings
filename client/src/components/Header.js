import React from "react";


export const Header = () => {
  const URL = "http://localhost:3000";
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between ">
      <a className="navbar-brand ms-2" href="/">
        Redux Gigs
      </a>

      <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item active">
            <a className="nav-link" href={URL + "/listing"}>
              Listings
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href={URL + "/listing/create"}>
              Create
            </a>
          </li>
        </ul>
      </div>
      <form className="d-flex me-5">
        <input
          className="form-control mr-sm-2 me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button
          className="btn btn-sm btn-outline-success my-2 my-sm-0 "
          type="submit"
        >
          Search
        </button>
      </form>
    </nav>
  );
};
