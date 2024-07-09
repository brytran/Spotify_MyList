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

  const TracksChart = () => {
    const [options, setOptions] = useState({
      // Data: Data to be displayed in the chart
      data: [],
      // Series: Defines which chart type and data to use
      series: [{ type: "bar", xKey: "month", yKey: "iceCreamSales" }],
    });

    var adjustedData = [];

    for (let i = 0; i < topTracks.length; i++) {
      adjustedData.push({});
    }

    return <AgCharts options={options} />;
  };

  return (
    <>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td colspan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default Stats;
