
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import styles from "../Pages/Home/Home.module.css";
import '../Layout/Header.css';

export default function Sidebar() {
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    const fetchGenresAndPlatforms = async () => {
      try {
        const genresResponse = await fetch(
          "https://api.rawg.io/api/genres?key=c6d86a1b0cfc40fa8902c3705680c2ed&dates=2024-01-01,2024-12-31"
        );
        const genresjson = await genresResponse.json();
        setGenres(genresjson.results);
  
        const platformsResponse = await fetch(
          "https://api.rawg.io/api/platforms?key=c6d86a1b0cfc40fa8902c3705680c2ed&dates=2024-01-01,2024-12-31"
        );
        const platformsJson = await platformsResponse.json();
        setPlatforms(platformsJson.results);
      } catch (error) {
        console.error("Error fetching genres and platforms:", error);
      }
    };

    fetchGenresAndPlatforms();
  }, []);
  
  return (
    <div className="sidebar">
      <div className={styles.detailsWrapper}>
        <details className={styles.dropdown}>
          <summary className={styles.summary}>Genres</summary>
          <ul>
            {genres.map((genre) => (
              <li key={genre.name}>
                <Link to={`/games/genre/${genre.id}`}>{genre.name}</Link>
              </li>
            ))}
          </ul>
        </details>

        <details className={styles.dropdown}>
          <summary className={styles.summary}>Platforms</summary>
          <ul>
            {platforms.map((platform) => (
              <li key={platform.id}>
                <Link to={`/games/platform/${platform.id}`}>{platform.name}</Link>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </div>
  );
}





