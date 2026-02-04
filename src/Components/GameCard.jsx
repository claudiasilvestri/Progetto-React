import { useState } from "react";
import { useNavigate } from "react-router";
import GameImage from "./GameImage";
import "../Layout/GameCard.css";

import { FaWindows, FaPlaystation, FaXbox, FaApple } from "react-icons/fa";
import { SiNintendo } from "react-icons/si";

export default function GameCard({ game }) {
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(true);

  const genres = game.genres.map((genre) => genre.name).join(", ");

  const getPlatformIcon = (platform) => {
    const name = platform.toLowerCase();

    if (name.includes("pc")) return <FaWindows />;
    if (name.includes("playstation")) return <FaPlaystation />;
    if (name.includes("xbox")) return <FaXbox />;
    if (name.includes("nintendo")) return <SiNintendo />;
    if (name.includes("mac")) return <FaApple />;

    return null;
  };

  return (
    <article
      className="game_card"
      onMouseEnter={() => setHidden(false)}
      onMouseLeave={() => setHidden(true)}
      onClick={() => navigate(`/games/${game.id}/${game.name}`)}
    >
      <div className="game_genres">{genres}</div>

      <div className="platform-icons">
        {game.parent_platforms?.map((p, index) => (
          <span
            key={index}
            className={`platform-icon ${p.platform.name.toLowerCase()}`}
          >
            {getPlatformIcon(p.platform.name)}
          </span>
        ))}
      </div>

      <GameImage image={game.background_image} />
      <h4 className="game_title">{game.name}</h4>

      {hidden ? (
        <small className="read_more">Read more...</small>
      ) : (
        <div className="game_info">
          <p>
            <strong>Release Date:</strong> {game.released || "N/A"}
          </p>
          <p>
            <strong>Rating:</strong> {game.rating || "N/A"} / 5
          </p>
          <p>
            <strong>Reviews Count:</strong> {game.reviews_count || 0}
          </p>
        </div>
      )}
    </article>
  );
}