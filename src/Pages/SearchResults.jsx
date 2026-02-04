import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../Layout/SearchResults.css";
import GameImage from "../components/GameImage";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

export default function SearchResults() {
  const { query } = useParams();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setResults([]);
    setLoading(true);

    const fetchResults = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=c6d86a1b0cfc40fa8902c3705680c2ed&search=${query}`
        );

        const data = await response.json();
        setResults(data.results || []);
      } catch (error) {
        console.error("Errore ricerca:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="search-results-container">
      <div className="search-results">
        {results.length === 0 ? (
          <p>Nessun risultato trovato.</p>
        ) : (
          results.map((game) => (
            <div key={game.id} className="game_card">
              <Link to={`/games/${game.id}/${game.name}`} className="game-link">
                <GameImage image={game.background_image} />

                <h3 className="game_title">{game.name}</h3>

                <div className="game_genres">
                  {game.genres?.map((g) => g.name).join(", ")}
                </div>

                <div className="game_info">
                  <p>Anno: {game.released}</p>
                  <p>
                    Piattaforme:{" "}
                    {game.platforms?.map((p) => p.platform.name).join(", ")}
                  </p>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>

      <BackButton />
    </div>
  );
}