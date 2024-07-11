import { useEffect, useState } from "react";
import { getTopArtists, getTopTracks } from "../static/js/main";
import { AgCharts } from "ag-charts-react";
import podium from "../assets/podium.png";
function Stats() {
  const [topArtists, setArtists] = useState([]);
  const [topTracks, setTracks] = useState([]);
  const [winningTracks, setWinningTracks] = useState([]);
  const [winningArtists, setWinningArtists] = useState([]);

  //TODO: Reconfigure to use different time scales, title text that explains page, add to homepage to redirect to stats, image api call fix

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const artists = await getTopArtists();
        const tracks = await getTopTracks();
        console.log(artists);
        setArtists(artists);
        setTracks(tracks);
        setWinningArtists(artists.slice(0, 3));
        setWinningTracks(tracks.slice(0, 3));
        console.log(artists.slice(0, 3));
      } catch {}
    };

    fetchStats();
  }, []);

  return (
    <>
      <div className="stats-container">
        <div className="tracks-container">
          <div className="tracks-podium-container">
            <img src={podium} className="podium-image" />
            {winningTracks.map((item, index) => (
              <a href={item.external_urls.spotify}><img className={"Podium" + (index+1) + " winner"} src={item.album.images[0].url} /></a>
            ))}
          </div>
          <div className="tracks-chart-container">
            <table class="table table-traits table-dark">
              <thead className="">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col"></th>
                  <th scope="col">Track</th>
                  <th scope="col">Artist</th>
                </tr>
              </thead>
              <tbody>
                {topTracks.map((item, index) => (
                  <tr key={index + 1}>
                    <td>{index + 1}</td>
                    <td>
                    <a href={item.external_urls.spotify}><img class="stat-image" src={item.album.images[2].url} /></a>
                    </td>
                    <td>{item.name}</td>
                    <td>{item.artists[0].name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="artists-container">
          <div className="artists-podium-container">
            <img src={podium} className="podium-image" />
            {winningArtists.map((item, index) => (
              <a href={item.external_urls.spotify}><img className={"Podium" + (index+1) + " winner"} src={item.images[0].url} /></a>
            ))}
          </div>
          <div className="artists-chart-container">
            <table class="table table-traits table-dark">
              <thead className="">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col"></th>
                  <th scope="col">Artist</th>
                </tr>
              </thead>
              <tbody>
                {topArtists.map((item, index) => (
                  <tr key={index + 1}>
                    <td>{index + 1}</td>
                    <td>
                    <a href={item.external_urls.spotify}><img class="stat-image" src={item.images[2].url} /></a>
                    </td>
                    <td>{item.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Stats;
