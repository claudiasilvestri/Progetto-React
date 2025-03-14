import { useState } from "react";
import { useNavigate } from "react-router";
import GameImage from "./GameImage";
import "../Layout/GameCard.css";

export default function GameCard({ game }) {
  const navigate = useNavigate ();
  const [hidden, setHidden] = useState(true);
  const genres = game.genres.map((genre) => genre.id).join(',');

  return (
    <article
className="game_card"
onMouseEnter={() => setHidden(false)}
onMouseLeave={() => setHidden(true)}
onClick={() => navigate(`/games/${game.id}/${game.name}`)}
    >
      
      <GameImage image={game.background_image} />
      <h4 className="game_title">{game.name}</h4>
      {hidden ? (
        <small className="read_more">Read more...</small>
      ) : (
        <div className="game_info">
          <p><strong>Release Date:</strong> {game.released || "N/A"}</p>
          <p><strong>Rating:</strong> {game.rating || "N/A"} / 5</p>
          <p><strong>Reviews Count:</strong> {game.reviews_count || 0}</p>
          <p>
            <strong>Platforms:</strong>{" "}
            {game.parent_platforms
              ? game.parent_platforms.map((p) => p.platform.name).join(", ")
              : "N/A"}
          </p>
        </div>
      )}
    </article>
  );
} 