import { useNavigate } from "react-router-dom";
import HPcharacters from "/home/PrakashRajan/Documents/Axios-task/Axios-task/src/assets/images/HPcharacters.jpg";
import spells from "/home/PrakashRajan/Documents/Axios-task/Axios-task/src/assets/images/spells.jpg";
import "../styles/Entrance.css";

function Entrance() {
  const navigate = useNavigate();

  const navigateHpCharacters = () => {
    navigate("/HpCharacters");
  };

  const navigateSpells = () => {
    navigate("/Spells");
  };

  return (
    <div className="container">
      <div>
        <h1 style={{ textAlign: "center" }}>HARRY POTTER WORLD !</h1>
        <p style={{ textAlign: "center", fontSize: "larger" }}>
          Discover your favorite Harry Potter characters and the spells they
          use.
          <br /> Explore a table filled with magical names and enchantments.
          <br />
          Step in and enjoy the magic!
        </p>
      </div>
      <div className="entrance-container">
        <div className="HPtable-container">
          <img
            src={HPcharacters}
            alt="HPcharactersImg"
            className="HPcharactersImg"
            onClick={navigateHpCharacters}
          />
          <p>Click the above image to see the Characters table</p>
        </div>
        <div className="spellsTable-container">
          <img
            src={spells}
            alt="spellsImg"
            onClick={navigateSpells}
            className="spellsImg"
          />
          <p>Click the above image to see the spells Table</p>
        </div>
      </div>
    </div>
  );
}

export default Entrance;
