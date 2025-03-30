import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../Layout/SearchResults.css"; 

const SearchResults = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      const response = await fetch(`https://api.rawg.io/api/games?key=c6d86a1b0cfc40fa8902c3705680c2ed&search=${query}`);
      const data = await response.json();
      setResults(data.results);
      setLoading(false);
    };

    fetchResults();
  }, [query]);

  const handleGoHome = () => {
    navigate("/"); 
  };

  return (
    <div className="search-results-container">
      {loading ? (
        <p>Caricamento...</p>
      ) : (
        <div className="search-results">
          {results.length === 0 ? (
            <p>Nessun risultato trovato.</p>
          ) : (
            results.map((game) => (
              <div key={game.id} className="game_card">
                <Link to={`/games/${game.id}/${game.name}`} className="game-link">
                  <img
                    src={game.background_image || 'https://via.placeholder.com/200'}
                    alt={game.name}
                    className="game-image"
                  />
                  <h3 className="game_title">{game.name}</h3>
                  <div className="game_genres">{game.genres?.map(genre => genre.name).join(", ")}</div>
                  <div className="game_info">
                    <p>Anno: {game.released}</p>
                    <p>Piattaforme: {game.platforms?.map(platform => platform.platform.name).join(", ")}</p>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      )}

      <button onClick={handleGoHome} className="homeButton">Home</button>
    </div>
  );
};

export default SearchResults;





