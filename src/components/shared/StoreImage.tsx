import { FaImage } from "react-icons/fa";
import { useState, useEffect } from "react";

type Props = {
  src: string | null;
  alt: string;
};

export default function StoreImage({ src, alt }: Props) {
  const [error, setError] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    if (!src) {
      setError(true);
      return;
    }

    // Generate full image path based on format
    let fullSrc = "";
    try {
      if (src.startsWith("http")) {
        // Direct URL
        fullSrc = src;
      } else if (src.startsWith("/Icons")) {
        // Use proxy to avoid CORS issues on Vercel
        const imagePath = src.replace("/Icons/", "");
        fullSrc = `/api/images/${imagePath}`;
      } else {
        // Default API path - use proxy
        fullSrc = `/api/images/${src}`;
      }
      
      console.log("Image URL:", fullSrc); // Debug log
      setImageUrl(fullSrc);
    } catch (err) {
      console.error("Error generating image URL:", err);
      setError(true);
    }
  }, [src]);

  // Fallback icon if no image or failed to load
  if (!src || error) {
    return (
      <div className="w-12 h-12 flex items-center justify-center bg-gray-100 text-gray-400 rounded">
        <FaImage size={20} />
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={alt}
      className="w-12 h-12 object-cover rounded"
      onError={(e) => {
        console.error("Image failed to load:", imageUrl, e);
        setError(true);
      }}
      onLoad={() => console.log("Image loaded successfully:", imageUrl)}
      loading="lazy"
    />
  );
}
