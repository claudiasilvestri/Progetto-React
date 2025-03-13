import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../Home/Home.module.css";
import GameCard from "../../Components/GameCard";

export default function Genre() {
  const [games, setGames] = useState([]);
  const { id } = useParams();

  const fetchGenres = async () => {
    const response = await fetch(
   `https://api.rawg.io/api/games?key=c6d86a1b0cfc40fa8902c3705680c2ed&genres=${id}&page=1`
);
    const json = await response.json();
    setGames(json.results);
  };

  useEffect(() => {
    fetchGenres();
  }, [id]);

  return (
    <div className="container">
      <div className={styles.games}></div>
      <div className={styles.heading}></div>

      <div>
          {games.map((game) => (
                    <GameCard key={game.id} game={game} />
                  ))}
        
      </div>
    </div>
  );
} 

