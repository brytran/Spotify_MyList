import { useEffect, useState } from "react";
import { getTopArtists, getTopTracks } from "../static/js/main";

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

  return <></>;
}

export default Stats;
