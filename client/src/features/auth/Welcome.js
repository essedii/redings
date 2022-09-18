import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentToken } from "./authSlice";
import { Link } from "react-router-dom";

const Welcome = () => {
  const username = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);

  const welcome = username ? `Welcome ${username}!` : "Welcome!";


  const content = (
    <section className="welcome">
      <h1>{welcome}</h1>

      <p>
        <Link to="/listings">Go to the Users List</Link>
      </p>
    </section>
  );

  return content;
};
export default Welcome;
