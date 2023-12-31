// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
// import "./ProfileButton.css";
import { useHistory, NavLink } from "react-router-dom";

// showMenu controls the display of the dropdown menu

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory("/");
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push("/");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className="user-profile-button-container">
      <button
        onClick={openMenu}
        id="profile-button"
        style={{ cursor: "pointer" }}
      >
        <i className="fa-solid fa-bars" style={{ fontSize: "20px" }}></i>
        <i className="fas fa-user-circle" style={{ fontSize: "20px" }} />
      </button>
      <div id="dropdown-info" className={ulClassName} ref={ulRef}>
        <div className={user ? "user-logged-in" : "user-not-logged-in"}>
          {user ? (
            <>
              <div id="hello">Hello, {user.firstName}</div>
              <div id="hello-email">{user.email}</div>
              <div>
                <NavLink
                  id="hello-manage"
                  to="/spots/current"
                  style={{ textDecoration: "none" }}
                  onClick={(e) => closeMenu()}
                >
                  Manage Spots
                </NavLink>
              </div>
              <div>
                <button id="logout-button" onClick={logout}>
                  Log Out
                </button>
              </div>
            </>
          ) : (
            <div className="sign-in-modal">
              <div className="su-li">
                <OpenModalMenuItem
                  itemText="Sign Up"
                  onItemClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
                <OpenModalMenuItem
                  itemText="Log In"
                  onItemClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileButton;
