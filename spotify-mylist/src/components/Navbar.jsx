import msu from "../assets/msu-logo.png";
import menu from "../assets/menu.png";
import { useEffect } from "react";
import React, { useState, useRef } from "react";
import { spotifyLogin } from "../static/js/main";

import { Navigate, useNavigate } from "react-router-dom";
function Navbar() {
  const sideMenu = useRef(null);
  const menuButton = useRef(null);
  const loginButton = useRef(null);
  const logoutButton = useRef(null);
  const [loggedIn, setloggedIn] = useState(false);
  const homeRoute = "http://localhost:5173/";

  function handleLogin() {
    setloggedIn(true);
    spotifyLogin();
  }

  function handleLogout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("verifier");
    setloggedIn(false);
    if (location.href == homeRoute) {
      location.reload();
    } else {
      window.location = homeRoute;
    }
  }

  useEffect(() => {
    if (sideMenu && sideMenu.current && menuButton && menuButton.current) {
      menuButton.current.addEventListener("click", (event) => {
        sideMenu.current.classList.toggle("toggleMenuOn");
      });
    }

    if (localStorage.getItem("access_token") != null) {
      setloggedIn(true);
    }
  }, []);

  return (
    <>
      <div className="navbar-container">
        <div id="title-group">
          <img src={msu} id="logo"></img>
          <p className="navbar-font" id="title-font">
            Spotify MyList
          </p>
          <img src={msu} id="logo"></img>
        </div>
      </div>
      <button id="menu-button" ref={menuButton}>
        <img src={menu} id="menu-img"></img>
      </button>
      <div className="side-menu" ref={sideMenu}>
        <div className="links-group">
          <a className="navbar-font link" id="home" href="/">
            Home
          </a>
          <a className="navbar-font link" id="create-playlist" href="/create">
            Create playlist
          </a>
          <a className="navbar-font link" id="stats" href="/statsselect">
            Your stats
          </a>
          <a className="navbar-font link" id="devs" href="/developers">
            Developers
          </a>

          <a
            className="navbar-font link"
            id={loggedIn ? "logout" : "login"}
            ref={loggedIn ? logoutButton : loginButton}
            onClick={loggedIn ? handleLogout : handleLogin}
          >
            {loggedIn ? "Logout" : "Login"}
          </a>
        </div>
      </div>
    </>
  );
}

export default Navbar;
