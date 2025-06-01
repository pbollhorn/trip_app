import { Link } from "react-router-dom";
import LoginLogoutComponent from "./LoginLogoutComponent.jsx";

export default function Header({ loggedIn, setLoggedIn }) {
  return (
    <>
      <div>
        <h1>
          <Link to="/" id="banner">
            Trip App
          </Link>
        </h1>
      </div>
      <div id="navbar">
        <div>
          <nav>
            <Link to="/" style={{ marginRight: "1rem" }}>
              Home
            </Link>
            <Link to="/trips" style={{ marginRight: "1rem" }}>
              Trips
            </Link>
            <Link to="/guides">Guides</Link>
          </nav>
        </div>
        <div>
          <LoginLogoutComponent loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        </div>
      </div>
    </>
  );
}
