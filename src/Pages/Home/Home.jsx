import styles from "./Home.module.css"; 
import GameCard from "../../components/GameCard";

export default function Home({ games }) {
  return (
    <div className={styles.container}>
      <div className={styles.games_wrapper}>
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}

  