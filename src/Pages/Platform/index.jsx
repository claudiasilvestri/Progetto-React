import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import styles from './Platform.module.css';
import GameCard from "../../components/GameCard";
import Sidebar from "../../components/Sidebar";
import Spinner from "../../components/Spinner"; 

const BASE_URL = "https://api.rawg.io/api/games?key=c6d86a1b0cfc40fa8902c3705680c2ed";

export default function Platform() {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [nextPageData, setNextPageData] = useState(null);
  const { platformID } = useParams();
  const navigate = useNavigate();
  const observerRef = useRef(null);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    const fetchPlatforms = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}&platforms=${platformID}&page=${page}`);
        const json = await response.json();
        setGames((prev) => [...prev, ...json.results]);

        const nextResponse = await fetch(`${BASE_URL}&platforms=${platformID}&page=${page + 1}`);
        const nextJson = await nextResponse.json();
        setNextPageData(nextJson.results);
      } catch (error) {
        console.error("Errore nel caricamento:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlatforms();
  }, [platformID, page]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextPageData) {
          setGames((prev) => [...prev, ...nextPageData]);
          setNextPageData(null);
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => observerRef.current.disconnect();
  }, [nextPageData]);

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

      <div ref={loadMoreRef} style={{ height: "20px" }} />

      {loading && page === 1 && <Spinner />}

      <button onClick={handleGoHome} className={styles.homeButton}>Home</button>
    </div>
  );
}






