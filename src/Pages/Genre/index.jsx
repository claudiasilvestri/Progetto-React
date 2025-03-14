import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../Home/Home.module.css";
import GameCard from "../../components/GameCard";

export default function Genre() {
  const [games, setGames] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await fetch(
        `https://api.rawg.io/api/games?key=c6d86a1b0cfc40fa8902c3705680c2ed&genres=${id}&page=1`
      );
      const json = await response.json();
      setGames(json.results);
    };

    fetchGenres();
  }, [id]);

  return (
    <div className={styles.main}>
      <div className={styles.heading}>
      </div>
      <div className={styles.games}>
        {games.map((game) => (
          <div key={game.id} className={styles.gameCard}>
            <GameCard game={game} />
          </div>
        ))}
      </div>
    </div>
  );
}




