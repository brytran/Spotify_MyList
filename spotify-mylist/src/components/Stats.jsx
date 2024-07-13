import Podium from "./Podium";
import Chart from "./Chart";
import { useLocation } from "react-router-dom";
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

  return (
    <>
      <div
        className="selection-container charts-header"
        style={{ background: "linear-gradient(" + color1 + "," + color2 + ")" }}
      ></div>
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
