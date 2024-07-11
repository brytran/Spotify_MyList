import { useEffect, useState, useRef } from "react";
import { getTopArtists, getTopTracks } from "../static/js/main";
import { useNavigate } from "react-router-dom";
function StatsSelection() {
  const midTracks = useRef(null);
  const navigate = useNavigate();
  //TODO: Reconfigure to use different time scales, title text that explains page, add to homepage to redirect to stats, image api call fix
  const HandleSelection = () => {
    navigate("/stats", {
      state: { type: "artists", duration: "mid" },
    });
  };
  useEffect(() => {
    if (midTracks && midTracks.current) {
      midTracks.current.addEventListener("click", (event) => {
        HandleSelection();
      });
    }
  }, []);

  return (
    <>
      <div className="start-button-container" ref={midTracks}>
        temp
      </div>
    </>
  );
}

export default StatsSelection;
