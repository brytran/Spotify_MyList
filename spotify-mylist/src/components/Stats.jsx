import Podium from "./Podium";
import Chart from "./Chart";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getTopArtists, getTopTracks } from "../static/js/main";
function Stats(props) {
  let location = useLocation();
  const type = location.state.type;
  const duration = location.state.duration;
  const [winningItems, setWinningItems] = useState([]);
  const [topItems, setTopItems] = useState([]);

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
  }, []);

  return (
    <>
      <div className="stats-container">
        <Podium topItems={winningItems}></Podium>
        <Chart chartItems={topItems}></Chart>
      </div>
    </>
  );
}

export default Stats;
