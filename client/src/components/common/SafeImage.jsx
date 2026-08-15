// src/components/common/SafeImage.jsx
import React, { useState } from "react";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85";

/**
 * Image component that gracefully falls back to a placeholder if the provided source fails to load.
 */
const SafeImage = ({ src, alt = "", className = "", ...props }) => {
  const [imageSrc, setImageSrc] = useState(src);
  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={() => setImageSrc(FALLBACK_IMAGE)}
      {...props}
    />
  );
};

export default SafeImage;
