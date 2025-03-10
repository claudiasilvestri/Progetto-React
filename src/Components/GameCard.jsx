
import { useState } from "react"; 
import "./GameCard.css"
export default function GameCard({ game }) {
  const [hidden, setHidden] = useState(true);

  return (
    <article
      onMouseEnter={() => setHidden(false)}
      onMouseLeave={() => setHidden(true)}
      className="game_card"
    >
      <img className="game_image" src={game.background_image} alt={game.name} />
      <small>Genres: {game.genres ? game.genres.map((g) => g.name).join(", ") : "N/A"}</small>
      <h4>{game.name}</h4>
      {hidden && <small>Read more...</small>}
      {!hidden &&
      <div>
        serie di info...
      </div>
      }
    </article>
  );
}
