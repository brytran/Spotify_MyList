import { useEffect, useState, useRef } from "react";
import { getTopArtists, getTopTracks } from "../static/js/main";
import { useNavigate } from "react-router-dom";
import StatCard from "./StatCard";
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
      <div className="stat-header-container">
        <p className="spotify-font stats-header-font">Your Top Hits</p>
      </div>
      <div className="selection-container">
        <p className="spotify-font sub-stat-header-font">Top Tracks</p>
        <div className="stat-cards-container">
          <StatCard
            color="#c95957"
            duration="Monthly"
            description="Your top tracks from the past 4 weeks"
            type="Tracks"
          />
          <StatCard
            color="#51afed"
            duration="Semi-Annual"
            description="Your top tracks from the past 6 months"
            type="Tracks"
          />
          <StatCard
            color="#a163f2"
            duration="Annual"
            description="Your top tracks from the past year"
            type="Tracks"
          />
        </div>
      </div>
      <div className="gradient-container">
        <p className="spotify-font sub-stat-header-font">Top Tracks</p>
        <div className="stat-cards-container">
          <StatCard
            color="#f5cc5b"
            duration="Monthly"
            description="Your top artists from the past 4 weeks"
            type="Artists"
          />
          <StatCard
            color="#5b77f5"
            duration="Semi-Annual"
            description="Your top artists from the past 6 months"
            type="Artists"
          />
          <StatCard
            color="#f55bd1"
            duration="Annual"
            description="Your top artists from the past year"
            type="Artists"
          />
        </div>
      </div>
    </>
  );
}

export default StatsSelection;
