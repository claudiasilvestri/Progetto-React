import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from './game.module.css';

const API_KEY = "c6d86a1b0cfc40fa8902c3705680c2ed";

const Carousel = ({ images }) => {
  const [scrollIndex, setScrollIndex] = useState(0);

  const handleScrollLeft = () => {
    setScrollIndex(scrollIndex === 0 ? images.length - 1 : scrollIndex - 1);
  };

  const handleScrollRight = () => {
    setScrollIndex(scrollIndex === images.length - 1 ? 0 : scrollIndex + 1);
  };

  return (
    <div className={styles.carousel}>
      <button onClick={handleScrollLeft} className={styles.scrollButton}>
        ‹
      </button>

      <div className={styles.carouselContainer} style={{ transform: `translateX(-${scrollIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div key={index} className={styles.carouselImageWrapper}>
            <img src={image} alt="Screenshot" className={styles.carouselImage} />
          </div>
        ))}
      </div>

      <button onClick={handleScrollRight} className={styles.scrollButton}>
        ›
      </button>
    </div>
  );
};

export default function Game() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gameRes = await fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
        const gameData = await gameRes.json();
        setGame(gameData);

        const screenshotsRes = await fetch(`https://api.rawg.io/api/games/${id}/screenshots?key=${API_KEY}`);
        const screenshotsData = await screenshotsRes.json();
        setScreenshots(screenshotsData.results || []);
        setLoading(false);
      } catch (error) {
        console.error("Errore nel fetch:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div className={styles.loading}>Caricamento...</div>;

  return (
    <div className={styles.centeredContainer}>
      {game && (
        <div className={styles.gameCard}>
          <div className={styles.gameTitle}>{game.name}</div>

          {screenshots.length > 0 && <Carousel images={screenshots.map(screenshot => screenshot.image)} />}

          <p>{game.description_raw}</p>
          <p className={styles.bold}>Rating: {game.rating}</p>
          <p className={styles.bold}>Released: {game.released}</p>
        </div>
      )}
    </div>
  );
}

