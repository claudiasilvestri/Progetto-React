import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import styles from './Platform.module.css';
import GameCard from "../../components/GameCard";
import Sidebar from "../../components/Sidebar";

export default function Platform() {
  const [games, setGames] = useState([]);
  const { platformID } = useParams();
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchPlatforms = async () => {
      const response = await fetch(
        `https://api.rawg.io/api/games?key=c6d86a1b0cfc40fa8902c3705680c2ed&platforms=${platformID}&page=1`
      );
      const json = await response.json();
      setGames(json.results);
    };

    fetchPlatforms();
  }, [platformID]);

  const handleGoHome = () => {
    navigate('/'); 
  };

  return (
    <div className={`${styles.main} ${styles.container}`}>
      <Sidebar />
      <div className={styles.games_wrapper}>
        {games.map((game) => (
          <div key={game.id} className={styles.gameCard}>
            <GameCard game={game} />
          </div>
        ))}
      </div>
      <button onClick={handleGoHome} className={styles.homeButton}>Home</button>
    </div>
  );
}





