import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import styles from './game.module.css';

export default function Game() {
    const { id } = useParams();
    const [game, setGame] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://api.rawg.io/api/games/${id}?key=c6d86a1b0cfc40fa8902c3705680c2ed`);
            const json = await response.json();
            setGame(json);
        };

        fetchData();
    }, [id]);

    return (
        <div className={styles.centeredContainer}>
            {game && (
                <div className={styles.gameCard}>
                    <div className={styles.gameTitle}>{game.name}</div>
                    <img src={game.background_image} alt={game.name} className={styles.gameImage} />
                    <p>{game.description_raw}</p>
                    <p className={styles.bold}>Rating: {game.rating}</p>
                    <p className={styles.bold}>Released: {game.released}</p>
                </div>
            )}
        </div>
    );
}


