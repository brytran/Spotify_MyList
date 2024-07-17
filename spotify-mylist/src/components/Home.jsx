import InstructionCard from "./InstructionCard";
import logo1 from "../assets/logo1.png";
import logo2 from "../assets/logo2.png";
import logo3 from "../assets/logo3.png";
import logo4 from "../assets/logo4.png";
import { useEffect } from "react";

function Home() {
  const instructions = [
    "Login to Spotify",
    "Choose up to five music genres",
    "Get your curated playlist",
    "Choose your playlist cover and title",
  ];

  return (
    <>
      <div className="welcome-container">
        <p id="home-title-font" className="spotify-font">
          Create your playlist
        </p>
        <p id="sub-title-font" className="spotify-font">
          Discover music you've never seen!
        </p>
      </div>

      <div className="instructions-container">
        <InstructionCard
          path={logo1}
          step="1"
          instr={instructions[0]}
        ></InstructionCard>
        <InstructionCard
          path={logo2}
          step="2"
          instr={instructions[1]}
        ></InstructionCard>
        <InstructionCard
          path={logo3}
          step="3"
          instr={instructions[2]}
        ></InstructionCard>
        <InstructionCard
          path={logo4}
          step="4"
          instr={instructions[3]}
        ></InstructionCard>
      </div>
      <div className="start-button-container">
        <a className="spotify-font" id="start" href="/create">
          Get Started!
        </a>
      </div>

      <div className="welcome-container">
        <p id="home-title-font" className="spotify-font">
          See your stats
        </p>
        <p id="sub-title-font" className="spotify-font">
          Compare with your friends!
        </p>
        <div className="start-button-container" id="stats">
          <a className="spotify-font" href="/statsselect">
            Let's Go!
          </a>
        </div>
      </div>
    </>
  );
}

export default Home;
