import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./Character.css";

function CharacterDetails() {
  const location = useLocation();
  const character = location.state?.character;

  if (!character) {
    return <p>No character details available.</p>;
  }

  return (
    <div className="details-container">
      <h2>{character.name}</h2>
      <img
        src={character.image || "https://via.placeholder.com/300"}
        alt={character.name}
        className="details-img"
      />
      <p><strong>House:</strong> {character.house || "No House Info"}</p>
      <p><strong>Species:</strong> {character.species}</p>
      <p><strong>Actor:</strong> {character.actor}</p>
      <Link to="/harrypotter" className="back-link">Back to Characters</Link>
    </div>
  );
}

export default CharacterDetails;
