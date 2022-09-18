import React from "react";


export const Header = () => {
  const URL = "http://localhost:3000";
  // const token = localStorage.getItem('token');
  // console.log(token);
  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    localStorage.removeItem('userId')
  }
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between mb-5">
      <a className="navbar-brand ms-2" href="/">
        Redux Gigs
      </a>

      <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item active">
            <a className="nav-link" href={URL + "/listings"}>
              Listings
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href={URL + "/listings/create"}>
              Create
            </a>
          </li>
        </ul>
       <button onClick={handleLogout}>LOGOUT</button>

      </div>
    {/* <h3>{token.username}</h3> */}
    </nav>
  );
};
