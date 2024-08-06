import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useSelector } from "react-redux";
import gamiki from '../../Logo/Gamiki2_processed.png'

function Navigation() {
  const user = useSelector((store) => store.session.user)




  return (
    <>
    <div className="navbar">
      <ul className="navbar-items">
        <li className="navbar-item">
          <NavLink to="/" className="navbar-link">
            <img className="logoMain" src={gamiki}  />
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
      {/* <Footer /> */}

    </div>
    </>
  );
}

export default Navigation;
