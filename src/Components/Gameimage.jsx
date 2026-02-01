import { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import NoCover from "../Assets/No-Cover.jpg";

export default function GameImage({ image, className = "" }) {
  const [imgSrc, setImgSrc] = useState(image || NoCover);

  useEffect(() => {
    setImgSrc(image || NoCover);
  }, [image]);

  return (
    <LazyLoadImage
      alt="Game Cover"
      effect="blur"
      src={imgSrc}
      onError={() => setImgSrc(NoCover)}
      className={`game-image ${className}`}
    />
  );
}