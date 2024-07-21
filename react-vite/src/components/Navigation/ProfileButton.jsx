import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  FaGamepad } from "react-icons/fa";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useNavigate } from "react-router-dom";
import './Navigation.css'

function ProfileButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const handleClick = () => {
    navigate("/manage-post");
  };

  const handleComment = () => {
    navigate("/manage-comment");
  };

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    navigate('/')
    closeMenu();
  };

  return (
    <>
      <button className="profile-btn" onClick={toggleMenu}>
        {/* <FaUserCircle /> */}
        <FaGamepad className="gamepad-icon" />
        {/* <FaUserNinja /> */}
      </button>
      {showMenu && (
        <ul className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <>
              <li>{user.username}</li>
              <li>{user.email}</li>
              <li onClick={handleClick}>Manage Post</li>
              <li onClick={handleComment}>Manage Comment</li>
              <li>
                <button  className="dropdown-btn"  onClick={logout}>Log Out</button>
              </li>
            </>
          ) : (
              <>
                <div className="profile-style">
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
                />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
                />
                </div>
            </>
          )}
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
