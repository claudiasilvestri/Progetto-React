import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./game.module.css";
import GameImage from "../../components/GameImage";
import BackButton from "../../components/BackButton";

const API_KEY = "c6d86a1b0cfc40fa8902c3705680c2ed";

function Carousel({ images }) {
  const [scrollIndex, setScrollIndex] = useState(0);

  const handleScrollLeft = () => {
    setScrollIndex(scrollIndex === 0 ? images.length - 1 : scrollIndex - 1);
  };

  const handleScrollRight = () => {
    setScrollIndex(scrollIndex === images.length - 1 ? 0 : scrollIndex + 1);
  };

  return (
    <div className={styles.carousel}>
      <button
        onClick={handleScrollLeft}
        className={`${styles.scrollButton} ${styles.leftButton}`}
      >
        ‹
      </button>

      <div
        className={styles.carouselContainer}
        style={{ transform: `translateX(-${scrollIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className={styles.carouselImageWrapper}>
            <GameImage image={image} className={styles.carouselShot} />
          </div>
        ))}
      </div>

      <button
        onClick={handleScrollRight}
        className={`${styles.scrollButton} ${styles.rightButton}`}
      >
        ›
      </button>
    </div>
  );
}

export default function Game() {
  const { id } = useParams();

  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gameRes = await fetch(
          `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
        );
        const gameData = await gameRes.json();
        setGame(gameData);

        const screenshotsRes = await fetch(
          `https://api.rawg.io/api/games/${id}/screenshots?key=${API_KEY}`
        );
        const screenshotsData = await screenshotsRes.json();
        setScreenshots(screenshotsData.results || []);
      } catch (error) {
        console.error("Errore nel fetch:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div className={styles.loading}>Caricamento...</div>;
  }

  return (
    <div className={styles.centeredContainer}>
      {game && (
        <div className={styles.gameCard}>
          <BackButton />

          <h2 className={styles.gameTitle}>{game.name}</h2>

          <GameImage
            image={game.background_image}
            className={styles.gameCover}
          />

          {screenshots.length > 0 && (
            <Carousel images={screenshots.map((s) => s.image).filter(Boolean)} />
          )}

          <p>{game.description_raw}</p>

          <p className={styles.bold}>Rating: {game.rating}</p>
          <p className={styles.bold}>Released: {game.released}</p>
        </div>
      )}
    </div>
  );
}