import { useEffect, useState } from "react";
import { getTopArtists, getTopTracks } from "../static/js/main";
import { AgCharts } from "ag-charts-react";
function Stats() {
  const [topArtists, setArtists] = useState([]);
  const [topTracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const artists = await getTopArtists();
        const tracks = await getTopTracks();
        setArtists(artists);
        setTracks(tracks);
      } catch {}
    };

    fetchStats();
  }, []);

  return (
    <>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col"></th>
            <th scope="col">Track</th>
            <th scope="col">Artist</th>
          </tr>
        </thead>
        <tbody>
          {topTracks.map((item, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>
                <img src={item.album.images[2].url} />
              </td>
              <td>{item.name}</td>
              <td>{item.artists[0].name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Stats;
