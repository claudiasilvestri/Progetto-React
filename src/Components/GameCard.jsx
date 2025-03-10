import { useState } from "react";
import "./GameCard.css";
import GameImage from "./GameImage";

export default function GameCard({ game }) {
  const [hidden, setHidden] = useState(true);

  return (
    <article
      onMouseEnter={() => setHidden(false)}
      onMouseLeave={() => setHidden(true)}
      className="game_card"
    >
      <GameImage image={game.background_image} />
      <small className="game_genres">
        Genres: {game.genres ? game.genres.map((g) => g.name).join(", ") : "N/A"}
      </small>
      <h4 className="game_title">{game.name}</h4>
      {hidden ? (
        <small className="read_more">Read more...</small>
      ) : (
        <div className="game_info">serie di info...</div>
      )}
    </article>
  );
}



