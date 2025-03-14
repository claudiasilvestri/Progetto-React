import { useParams } from "react-router";
import { useState, useEffect } from "react";

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
        <div className="container">
            {game && (
                <>
                    <img src={game.background_image} alt="" />
                    <h1>{game.name}</h1>
                    <p>{game.description_raw}</p>
                    <p>{game.rating}</p>
                    <p>{game.released}</p>
                </>
            )}
        </div>
    );
}
