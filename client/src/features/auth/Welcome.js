import { useSelector } from "react-redux";
import { selectCurrentUser } from "./authSlice";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  let username = localStorage.getItem("username");
  let welcome = username ? `Welcome ${username}!` : "Welcome!";
  const navigate = useNavigate();

  const content = (
    <section className="welcome">
      <div className="container">
        <h1>{welcome}</h1>
        <h3>Now you can create, update and delete your listings</h3>
      </div>
      <div className="mt-5 d-flex justify-content-center">
      <button className="btn btn-outline-primary me-2"  onClick={() => navigate("/listings/create")}>Create a listing</button>
      <button className="btn btn-primary"  onClick={() => navigate("/listings")}>Check Listings</button>
      </div>
     
    
    </section>
  );

  return content;
};
export default Welcome;
