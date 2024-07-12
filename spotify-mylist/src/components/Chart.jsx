function Chart(props) {
  const data = props.chartItems;
  console.log(data[0]);
  return (
    <>
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
            {data.map((item, index) => (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                <td>
                  <a href={item.external_urls.spotify} target="_blank">
                    <img
                      class="stat-image"
                      src={
                        item.album
                          ? item.album.images[2].url
                          : item.images[2].url
                      }
                    />
                  </a>
                </td>
                <td>{item.name}</td>
                <td>{item.album ? item.artists[0].name : item.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Chart;
