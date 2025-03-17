import { useState, useEffect, useRef } from "react";
import styles from "./Home.module.css";
import GameCard from "../../components/GameCard";
import Sidebar from "../../components/Sidebar";
import Spinner from "../../components/Spinner";

const BASE_URL =
  "https://api.rawg.io/api/games?key=c6d86a1b0cfc40fa8902c3705680c2ed&dates=2024-01-01,2024-12-31&page_size=20";

export default function Home() {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [nextPageData, setNextPageData] = useState(null);
  const observerRef = useRef(null);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}&page=${page}`);
        const json = await response.json();
        setGames((prev) => [...prev, ...json.results]);

        const nextResponse = await fetch(`${BASE_URL}&page=${page + 1}`);
        const nextJson = await nextResponse.json();
        setNextPageData(nextJson.results);
      } catch (error) {
        console.error("Errore nel caricamento:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

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

  return (
    <div className={`${styles.main} ${styles.container}`}>
      <Sidebar />
  
      <div className={styles.content}>
        <h1 className={styles.title}>New and trending</h1> 
        
        <div className={styles.games_wrapper}>
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
  
        <div ref={loadMoreRef} style={{ height: "20px" }} />
  
        {loading && page === 1 && <Spinner />}
      </div>
    </div>
  );
}