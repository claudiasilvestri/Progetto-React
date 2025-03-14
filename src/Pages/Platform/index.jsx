import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../Home/Home.module.css";
import GameCard from "../../components/GameCard";

export default function Platform() {
  const [games, setGames] = useState([]);
  const { platformID } = useParams(); 

  useEffect(() => {
    const fetchPlatform = async () => {
      const response = await fetch(
      `https://api.rawg.io/api/platforms?key=c6d86a1b0cfc40fa8902c3705680c2ed&platforms=${platformId}&page=1`
      );
      const json = await response.json();
      setGames(json.results);
    };

    fetchPlatform();
  }, [platformId]); 

  return (
    <div className={styles.main}>
      <div className={styles.heading}>
        <h1>Giochi per piattaforma</h1>
      </div>
      <div className={styles.games}>
        {games.length > 0 ? (
          games.map((game) => (
            <div key={game.id} className={styles.gameCard}>
              <GameCard game={game} />
            </div>
          ))
        ) : (
          <p>Nessun gioco trovato per questa piattaforma.</p>
        )}
      </div>
    </div>
  );
}

