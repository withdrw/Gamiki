import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <div className="navbar">
      <ul className="navbar-items">
        <li className="navbar-item">
          <NavLink to="/" className="navbar-link">
            Home
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/create-post" className="navbar-link">
            Create Post
          </NavLink>
          <ProfileButton />
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
