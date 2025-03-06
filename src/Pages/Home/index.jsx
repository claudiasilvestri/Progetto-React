import { useEffect, useState } from "react";
import styles from "./Home.module.css";

const url = "https://api.rawg.io/api/games?key=c6d86a1b0cfc40fa8902c3705680c2ed&dates=2024-01-01,2024-12-31&page=1";

export default function Home() {

    const [games, setGames] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                setGames(json.results);
            } catch (error) {
                console.error("Errore nel fetch dei giochi:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container">
            <div className={styles.games_wrapper}>
                {games.map((game) => (
                    <div key={game.id} className={styles.game_card}>
                        <img src={game.background_image} alt={game.name} className={styles.game_image} />
                        <h3>{game.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}
