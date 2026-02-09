import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../Supabase/client";
import { useContext } from "react";
import { SessionContext } from "../Context/SessionContext";

export default function Favorites() {
  const { user } = useContext(SessionContext);
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchFavorites = async () => {
      const { data, error } = await supabase
        .from("favorites")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) {
        setFavorites(data || []);
      }

      setLoading(false);
    };

    fetchFavorites();
  }, [user]);

  if (!user) {
    return <p>Effettua il login per vedere i tuoi preferiti ❤️</p>;
  }

  if (loading) {
    return <p>Caricamento...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <button
        onClick={() => navigate(-1)}
        style={{ marginBottom: "20px" }}
      >
        ← Back
      </button>

      <h2>I miei preferiti ❤️</h2>

      {favorites.length === 0 ? (
        <p>Nessun gioco nei preferiti.</p>
      ) : (
        <ul>
          {favorites.map((game) => (
            <li key={game.id}>{game.game_name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
