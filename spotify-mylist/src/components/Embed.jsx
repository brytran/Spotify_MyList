import { useEffect, useState, useRef } from "react";
import { Navigate, useLocation } from "react-router-dom";
import loading from "../assets/loading.png";
function Embed(props) {
  const [loadStatus, setStatus] = useState(false);

  let location = useLocation();
  const uri = location.state.playlist_uri;
  const loadingObject = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      window.onSpotifyIframeApiReady = (IFrameAPI) => {
        const element = document.getElementById("embed-iframe");
        const options = {
          uri: uri,
          width: "100%",
        };
        const callback = (EmbedController) => {};
        IFrameAPI.createController(element, options, callback);
      };
      setStatus(true);
      loadingObject.current.classList.toggle("nullDisplay");
    }, 5000);
  }, []);
  console.log(uri);

  if (typeof uri === "undefined") {
    return (
      <>
        <div className="embed-container">
          <p className="spotify-font" id="home-title-font">
            error
          </p>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="embed-container">
          {loadStatus ? (
            <p className="spotify-font embed-header" id="home-title-font">
              Your custom MyList!
            </p>
          ) : (
            <p className="spotify-font embed-header" id="home-title-font">
              Loading...
            </p>
          )}
          <div id="embed-iframe"></div>
          <div className="loading-container">
            <img
              className="loading rotating"
              src={loading}
              ref={loadingObject}
            />
          </div>
        </div>
        <div className="start-button-container">
          <a className="spotify-font" id="start" href="/">
            Go home
          </a>
        </div>
      </>
    );
  }
}

export default Embed;
