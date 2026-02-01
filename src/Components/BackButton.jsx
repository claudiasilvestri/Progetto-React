import { useNavigate } from "react-router-dom";
import "../Layout/BackButton.css";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      className="backButtonFixed"
      onClick={() => navigate(-1)}
    >
      ← Back
    </button>
  );
}