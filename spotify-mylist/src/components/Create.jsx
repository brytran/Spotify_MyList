import logo1 from "../assets/logo1.png";
import logo2 from "../assets/logo2.png";
import logo3 from "../assets/logo3.png";
import logo4 from "../assets/logo4.png";
import logo5 from "../assets/logo5.png";
import next from "../assets/next.png";
import { useEffect, useState } from "react";
import React, { useRef } from "react";

function Create() {
  const albumImage = [logo1, logo2, logo3, logo4, logo5];
  const [index, setIndex] = useState(0);
  const [otherIndex, setOtherIndex] = useState(0);
  const [tracker, setTracker] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const backwardButton = useRef(null);
  const forwardButton = useRef(null);
  const searchBar = useRef(null);
  const itemList = [
    "acoustic",
    "afrobeat",
    "alt-rock",
    "alternative",
    "ambient",
    "anime",
    "black-metal",
    "bluegrass",
    "blues",
    "bossanova",
    "brazil",
    "breakbeat",
    "british",
    "cantopop",
    "chicago-house",
    "children",
    "chill",
    "classical",
    "club",
    "comedy",
    "country",
    "dance",
    "dancehall",
    "death-metal",
    "deep-house",
    "detroit-techno",
    "disco",
    "disney",
    "drum-and-bass",
    "dub",
    "dubstep",
    "edm",
    "electro",
    "electronic",
    "emo",
    "folk",
    "forro",
    "french",
    "funk",
    "garage",
    "german",
    "gospel",
    "goth",
    "grindcore",
    "groove",
    "grunge",
    "guitar",
    "happy",
    "hard-rock",
    "hardcore",
    "hardstyle",
    "heavy-metal",
    "hip-hop",
    "holidays",
    "honky-tonk",
    "house",
    "idm",
    "indian",
    "indie",
    "indie-pop",
    "industrial",
    "iranian",
    "j-dance",
    "j-idol",
    "j-pop",
    "j-rock",
    "jazz",
    "k-pop",
    "kids",
    "latin",
    "latino",
    "malay",
    "mandopop",
    "metal",
    "metal-misc",
    "metalcore",
    "minimal-techno",
    "movies",
    "mpb",
    "new-age",
    "new-release",
    "opera",
    "pagode",
    "party",
    "philippines-opm",
    "piano",
    "pop",
    "pop-film",
    "post-dubstep",
    "power-pop",
    "progressive-house",
    "psych-rock",
    "punk",
    "punk-rock",
    "r-n-b",
    "rainy-day",
    "reggae",
    "reggaeton",
    "road-trip",
    "rock",
    "rock-n-roll",
    "rockabilly",
    "romance",
    "sad",
    "salsa",
    "samba",
    "sertanejo",
    "show-tunes",
    "singer-songwriter",
    "ska",
    "sleep",
    "songwriter",
    "soul",
    "soundtracks",
    "spanish",
    "study",
    "summer",
    "swedish",
    "synth-pop",
    "tango",
    "techno",
    "trance",
    "trip-hop",
    "turkish",
    "work-out",
    "world-music",
  ];

  const image1 = useRef(null);
  const image2 = useRef(null);

  const handleSelect = (item) => {
    if (selectedItems.length < 5 && !selectedItems.includes(item)) {
      setSelectedItems((prevItems) => [...prevItems, item]);
    }
  };

  const handleRemove = (item) => {
    setSelectedItems((prevItems) =>
      prevItems.filter((prevItem) => prevItem !== item)
    );
    setFilteredItems((prevItems) =>
      prevItems.filter((prevItem) => prevItem !== item)
    );
  };

  const handleSearch = (query) => {
    // Filter items based on the query
    let filterItems = itemList.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    if (!query) {
      filterItems = selectedItems;
    }

    setFilteredItems(filterItems);
  };
  return (
    <>
      <div className="create-title-container spotify-font">
        <p className="title-font">Create your playlist!</p>
        <p className="spotify-font">Choose your genres and playlist cover</p>
      </div>
      <div className="create-container">
        <div className="carousel">
          <div className="carousel-container">
            <div className="images-container">
              <img
                src={albumImage[index]}
                className="hidden album-image"
                ref={image1}
              ></img>
              <img
                src={albumImage[otherIndex]}
                className="album-image"
                ref={image2}
              ></img>
            </div>

            <div className="buttons-container">
              <img
                src={next}
                className="nextButton"
                id="backward"
                ref={backwardButton}
                onClick={() => {
                  if (tracker) {
                    if (otherIndex - 1 < 0) {
                      setIndex(albumImage.length - 1);
                    } else {
                      setIndex(otherIndex - 1);
                    }
                  } else {
                    if (index - 1 < 0) {
                      setOtherIndex(albumImage.length - 1);
                    } else {
                      setOtherIndex(index - 1);
                    }
                  }

                  setTracker(!tracker);
                  image1.current.classList.toggle("hidden");
                  image2.current.classList.toggle("hidden");
                }}
              ></img>
              <img
                src={next}
                className="nextButton"
                id="forward"
                ref={forwardButton}
                onClick={() => {
                  if (tracker) {
                    if (otherIndex + 1 === albumImage.length) {
                      setIndex(0);
                    } else {
                      setIndex(otherIndex + 1);
                    }
                  } else {
                    if (index + 1 === albumImage.length) {
                      setOtherIndex(0);
                    } else {
                      setOtherIndex(index + 1);
                    }
                  }

                  setTracker(!tracker);
                  image1.current.classList.toggle("hidden");
                  image2.current.classList.toggle("hidden");
                }}
              ></img>
            </div>
          </div>
        </div>
        <div className="add-container">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search genres:"
              onChange={(e) => handleSearch(e.target.value)}
            />

            {/* Display search results */}
            <div className="suggestions-container">
              {filteredItems.map((item) => (
                <div
                  key={item}
                  className={`suggestion-item ${
                    selectedItems.includes(item) ? "selected" : ""
                  }`}
                  onClick={() => {
                    if (selectedItems.includes(item)) {
                      handleRemove(item);
                    } else {
                      handleSelect(item);
                    }
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="spotify-font" id="create-album-container">
        <a
          id="create-album"
          onClick={function () {
            console.log(selectedItems);
          }}
        >
          Create!
        </a>
      </div>
    </>
  );
}

export default Create;
