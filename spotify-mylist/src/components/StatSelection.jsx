import { useEffect, useState, useRef } from "react";
import { getTopArtists, getTopTracks } from "../static/js/main";
import { useNavigate } from "react-router-dom";
import StatCard from "./StatCard";
function StatsSelection(duration, type, grad1, grad2) {
  const lowTracks = useRef(null);
  const midTracks = useRef(null);
  const highTracks = useRef(null);
  const lowArtists = useRef(null);
  const midArtists = useRef(null);
  const highArtists = useRef(null);

  const navigate = useNavigate();
  //TODO: Reconfigure to use different time scales, title text that explains page, add to homepage to redirect to stats, image api call fix
  const HandleSelection = (type, duration, grad1, grad2, grad3) => {
    navigate("/stats", {
      state: {
        type: type,
        duration: duration,
        grad1: grad1,
        grad2: grad2,
        grad3: grad3,
      },
    });
  };
  useEffect(() => {
    if (lowArtists && lowArtists.current) {
      lowArtists.current.addEventListener("click", () => {
        HandleSelection("artists", "Monthly", "#f5cc5b", "#ad9040", "#94782b");
      });
    }
    if (midArtists && midArtists.current) {
      midArtists.current.addEventListener("click", () => {
        HandleSelection("artists", "Semi-Annual", "#5b77f5", "#4b62c9", "#32428f")
      });
    }
    if (highArtists && highArtists.current) {
      highArtists.current.addEventListener("click", () => {
        HandleSelection("artists", "Annual", "#f55bd1", "#bf47a3", "#8f3278")
      });
    }
    if (lowTracks && lowTracks.current) {
      lowTracks.current.addEventListener("click", () => {
        HandleSelection("tracks", "Monthly", "#c95957", "#ad4c4b", "#8c3d3c");
      });
    }
    if (midTracks && midTracks.current) {
      midTracks.current.addEventListener("click", () => {
        HandleSelection("tracks", "Semi-Annual", "#51afed", "#4493c7", "#2e688f");
      });
    }
    if (highTracks && highTracks.current) {
      highTracks.current.addEventListener("click", () => {
        HandleSelection("tracks", "Annual", "#a163f2", "#7f4ebf", "#603a91");
      });
    }
  }, []);

  return (
    <>
      <div className="stat-header-container ">
        <p className="spotify-font stats-header-font">Your Top Hits</p>
      </div>
      <div className="selection-container stat-header-gradient">
        <p className="spotify-font sub-stat-header-font" id="track-header">
          Top Tracks
        </p>
        <div className="stat-cards-container">
          <StatCard
            color="#c95957"
            duration="Monthly"
            description="Your top tracks from the past 4 weeks"
            type="Tracks"
            reference={lowTracks}
          />
          <StatCard
            color="#51afed"
            duration="Semi-Annual"
            description="Your top tracks from the past 6 months"
            type="Tracks"
            reference={midTracks}
          />
          <StatCard
            color="#a163f2"
            duration="Annual"
            description="Your top tracks from the past year"
            type="Tracks"
            reference={highTracks}
          />
        </div>
      </div>
      <div className="gradient-container" id="chart-gradient">
        <p className="spotify-font sub-stat-header-font" id="artist-header">
          Top Artists
        </p>
        <div className="stat-cards-container">
          <StatCard
            color="#f5cc5b"
            duration="Monthly"
            description="Your top artists from the past 4 weeks"
            type="Artists"
            reference={lowArtists}
          />
          <StatCard
            color="#5b77f5"
            duration="Semi-Annual"
            description="Your top artists from the past 6 months"
            type="Artists"
            reference={midArtists}
          />
          <StatCard
            color="#f55bd1"
            duration="Annual"
            description="Your top artists from the past year"
            type="Artists"
            reference={highArtists}
          />
        </div>
      </div>
    </>
  );
}

export default StatsSelection;
