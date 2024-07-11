import { useEffect, useState } from "react";
import { getTopArtists, getTopTracks } from "../static/js/main";
import { AgCharts } from "ag-charts-react";
import podium from "../assets/podium.png";
function Stats() {
  const [topArtists, setArtists] = useState([]);
  const [topTracks, setTracks] = useState([]);
  const [winningTracks, setWinningTracks] = useState([]);
  const [winningArtists, setWinningArtists] = useState([]);

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
            <img
              className="onePodium winner"
              src={winningTracks[0].album.images[1].url}
            />
            <img
              className="twoPodium winner"
              src={winningTracks[1].album.images[1].url}
            />
            <img
              className="threePodium winner"
              src={winningTracks[2].album.images[1].url}
            />
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
                      <img class="stat-image" src={item.album.images[2].url} />
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
            <img
              className="onePodium winner winningArtists"
              src={winningArtists[0].images[1].url}
            />
            <img
              className="twoPodium winner winningArtists"
              src={winningArtists[1].images[1].url}
            />
            <img
              className="threePodium winner winningArtists"
              src={winningArtists[2].images[1].url}
            />
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
                      <img class="stat-image" src={item.images[2].url} />
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
