import { useEffect } from "react";
import { Navigate } from "react-router-dom";

function Embed({ playlist_uri }) {
  useEffect(() => {}, []);

  console.log(playlist_uri);

  if (typeof playlist_uri === "undefined") {
    return <Navigate to={"/create"}></Navigate>;
  } else {
    return <></>;
  }
}

export default Embed;
