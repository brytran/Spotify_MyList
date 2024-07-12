import { useEffect, useState } from "react";
import podium from "../assets/podium.png";
function Podium(props) {
  const winners = props.topItems;
  console.log(winners);

  return (
    <>
      <div className="tracks-podium-container">
        <img src={podium} className="podium-image" />
        {winners.map((item, index) => (
          <a href={item.external_urls.spotify} target="_blank">
            <img
              className={"Podium" + (index + 1) + " winner"}
              src={item.album ? item.album.images[0].url : item.images[0].url}
            />
          </a>
        ))}
      </div>
    </>
  );
}

export default Podium;
