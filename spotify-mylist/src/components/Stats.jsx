import Podium from "./Podium";
import Chart from "./Chart";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getTopArtists, getTopTracks } from "../static/js/main";
function Stats(props) {
  let location = useLocation();
  const type = location.state.type;
  const duration = location.state.duration;
  const color1 = location.state.grad1;
  const color2 = location.state.grad2;
  const color3 = location.state.grad3;
  const [winningItems, setWinningItems] = useState([]);
  const [topItems, setTopItems] = useState([]);
  const [style1, setStyle1] = useState("");
  const [style2, setStyle2] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (type == "artists") {
          const data = await getTopArtists();
          setTopItems(data);
          setWinningItems(data.slice(0, 3));
        } else {
          const data = await getTopTracks();
          setTopItems(data);
          setWinningItems(data.slice(0, 3));
        }
      } catch {}
    };

    fetchStats();

    setStyle1({
      background: "linear-gradient(" + color1 + "," + color2 + ")",
    });
    setStyle2({
      background: "linear-gradient(" + color3 + "," + "#000000)",
    });
  }, []);

  function HandleRedirect() {
    navigate("/statsselect");
  }

  return (
    <>
      <div
        className="selection-container charts-header"
        style={{ background: "linear-gradient(" + color1 + "," + color2 + ")" }}
      >
        <div
          className=" chart-header-image"
          style={{
            background: color1,
            boxShadow: "0 0 1.25rem 0.5rem " + color2,
          }}
        >
          <p className="spotify-font stat-image-font top-font">Top</p>
          <p className="spotify-font stat-image-font">{type}</p>
          <p className="spotify-font stat-image-font duration-font">
            {duration}
          </p>
        </div>
        <div className="chart-header-text-container">
          <p className="spotify-font stats-chart-header-font header-font-align">
            {type == "artists"
              ? "Top Artists " + duration
              : "Top Tracks" + " " + duration}
          </p>
          <p className="spotify-font header-font-align charts-subfont">
            {type == "artists"
              ? "Artists you've had on repeat -" + duration
              : "Song you've had on repeat -" + " " + duration}
          </p>
          <div className="spotify-font header-font-align charts-subfont">
            <a
              className="spotify-font header-font-align"
              id="redirect-link"
              onClick={HandleRedirect}
            >
              Top Hits
            </a>
            {" - 30 Entires"}
          </div>
          <div
            className="spotify-font"
            id="go-selection"
            onClick={HandleRedirect}
          >
            <p id="go-selection-font">Go back</p>
          </div>
        </div>
      </div>
      <div
        className="podium-gradient"
        style={{ background: "linear-gradient(" + color3 + "," + "#111312)" }}
      >
        <Podium topItems={winningItems}></Podium>
      </div>
      <div className="gradient-container">
        <div className="stats-container">
          <Chart chartItems={topItems}></Chart>
        </div>
      </div>
    </>
  );
}

export default Stats;
