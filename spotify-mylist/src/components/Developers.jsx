import Bryan from "../assets/Bryan.jpg";
import Thu from "../assets/Thu.jpg";
import Matthew from "../assets/Matt.jpg";
import Ben from "../assets/Ben.jpg";
import linkedin from "../assets/linkedin.png";
function Developers() {
  return (
    <>
      <p className="dev-title spotify-font">Meet the developers!</p>
      <div className="developer-container">
        <div className="developer-card">
          <img className="profile-picture" src={Bryan} />
          <div className="dev-info">
            <p className="spotify-font name">Bryan Tran</p>
            <p className="spotify-font">Lead Developer</p>
            <p className="spotify-font school">Michigan State University</p>

            <a
              className="linkedin"
              href="https://www.linkedin.com/in/bryan-tran-b30a79229/"
              target="_blank"
            >
              <img className="linkedin" src={linkedin} />
            </a>
          </div>
        </div>
        <div className="developer-card">
          <img className="profile-picture" src={Matthew} />
          <div className="dev-info">
            <p className="spotify-font name">Matthew Inda</p>
            <p className="spotify-font school">University of Michigan</p>

            <a
              className="linkedin"
              href="https://www.linkedin.com/in/matthew-inda/"
              target="_blank"
            >
              <img className="linkedin" src={linkedin} />
            </a>
          </div>
        </div>
        <div className="developer-card">
          {" "}
          <img className="profile-picture" src={Thu} />
          <div className="dev-info">
            <p className="spotify-font name">Thu Doan</p>
            <p className="spotify-font school">Michigan State University</p>

            <a
              className="linkedin"
              href="https://www.linkedin.com/in/doanthum/"
              target="_blank"
            >
              <img className="linkedin" src={linkedin} />
            </a>
          </div>
        </div>
        <div className="developer-card">
          {" "}
          <img className="profile-picture" src={Ben} />
          <div className="dev-info">
            <p className="spotify-font name">Ben Crimmins</p>

            <p className="spotify-font">Lead Developer</p>
            <p className="spotify-font school">Michigan State University</p>

            <a
              className="linkedin"
              href="https://www.linkedin.com/in/benjamin-crimmins/"
              target="_blank"
            >
              <img className="linkedin" src={linkedin} />
            </a>
          </div>
        </div>
      </div>
      <p className="disclaimer spotify-font">
        *We are not affiliated with Spotify in anyway
      </p>
    </>
  );
}

export default Developers;
