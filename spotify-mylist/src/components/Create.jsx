import logo1 from "../assets/logo1.png";
import logo2 from "../assets/logo2.png";
import logo3 from "../assets/logo3.png";
import logo4 from "../assets/logo4.png";
import logo5 from "../assets/logo5.png";
import next from "../assets/next.png";
import { useEffect, useState } from "react";
import React, { useRef } from "react";
import { getGenres } from "../static/js/main";
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

  const image1 = useRef(null);
  const image2 = useRef(null);

  let itemList = getGenres();
  // console.log(itemList);

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
          <div className="name-container">
            <p className="spotify-font create-font">MyList Title:</p>
            <input
              type="text"
              placeholder="Playlist Name:"
              id="playlist-name"
            ></input>
          </div>
          <div className="search-container">
            <p className="spotify-font create-font">
              Choose your genres: (Max 5)
            </p>

            <input
              type="text"
              placeholder="Search genres:"
              onChange={(e) => handleSearch(e.target.value)}
              id="genres"
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
