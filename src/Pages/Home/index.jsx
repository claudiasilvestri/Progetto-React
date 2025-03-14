import { useState, useEffect } from "react";
import styles from "./Home.module.css";
import GameCard from "../../components/GameCard";
import Sidebar from "../../components/Sidebar";

const url = "https://api.rawg.io/api/games?key=c6d86a1b0cfc40fa8902c3705680c2ed&dates=2024-01-01,2024-12-31";

export default function Home() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const json = await response.json();
      setGames(json.results);
    };

    fetchData();
  }, []);

  return (
    <div className={`${styles.main} ${styles.container}`}>
      <Sidebar />
      <div className={styles.games_wrapper}>
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}
