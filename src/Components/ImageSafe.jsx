import { useState } from "react";

export default function ImageSafe({ src, alt }) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className="image-placeholder">
        No Image
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="game-image"
      onError={() => setError(true)}
    />
  );
}