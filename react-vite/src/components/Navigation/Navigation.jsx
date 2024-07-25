import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useSelector } from "react-redux";
import Footer from "./Footer";


function Navigation() {
  const user = useSelector((store) => store.session.user)




  return (
    <>
    <div className="navbar">
      <ul className="navbar-items">
        <li className="navbar-item">
          <NavLink to="/" className="navbar-link">
            Home
          </NavLink>
        </li>
        <li className="navbar-item">
            {
              user && (
                <NavLink to="/create-post" className="navbar-link">
           Create Post
         </NavLink>
     )
    }
          <ProfileButton />
        </li>
      </ul>
    </div>
    <div>
      <Footer />

    </div>
    </>
  );
}

export default Navigation;
