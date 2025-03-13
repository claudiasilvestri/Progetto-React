import { useState, useEffect } from "react";
import styles from "./Home.module.css";
import GameCard from "../../Components/GameCard";
import Sidebar from "../../Components/Sidebar";

const url = "https://api.rawg.io/api/games?key=c6d86a1b0cfc40fa8902c3705680c2ed&dates=2024-01-01,2024-12-31";

export default function Home() {
  const [games, setGames] = useState([]);

  const fetchData = async () => {
    const response = await fetch(url);
    const json = await response.json();
    setGames(json.results);
  };

  useEffect(() => {
    fetchData();
}, []);

return (
  <div className={`${styles.main} ${styles.container}`}>
   < Sidebar/>
    <div className={styles.games_wrapper}>
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  </div>
);
}
