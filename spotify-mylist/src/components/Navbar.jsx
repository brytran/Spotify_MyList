import msu from "../assets/msu-logo.png";
import menu from "../assets/menu.png";
import { useEffect } from "react";
import React, { useRef } from "react";
function Navbar() {
  const sideMenu = useRef(null);
  const menuButton = useRef(null);
  useEffect(() => {
    if (sideMenu && sideMenu.current && menuButton && menuButton.current) {
      menuButton.current.addEventListener("click", (event) => {
        console.log("hit");
        sideMenu.current.classList.toggle("toggleMenuOn");
      });
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
          <a className="navbar-font link" id="stats" href="/stats">
            Your stats
          </a>
          <a className="navbar-font link" id="devs" href="/developers">
            Developers
          </a>
          <a className="navbar-font link" id="login">
            Login
          </a>
          <a className="navbar-font link" id="logout">
            Logout
          </a>
        </div>
      </div>
    </>
  );
}

export default Navbar;
