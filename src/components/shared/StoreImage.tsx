import { FaImage } from "react-icons/fa";
import { useState } from "react";

type Props = {
  src: string | null;
  alt: string;
};

export default function StoreImage({ src, alt }: Props) {
  const [error, setError] = useState(false);

  // Fallback icon if no image or failed to load
  if (!src || error) {
    return (
      <div className="w-12 h-12 flex items-center justify-center bg-gray-100 text-gray-400 rounded">
        <FaImage size={20} />
      </div>
    );
  }

  // Generate full image path based on format
  let fullSrc = "";
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://41.38.56.140/Store.ApI";
    fullSrc = src.startsWith("http")
      ? src
      : src.startsWith("/Icons")
        ? `${apiUrl}${src}`
        : `${apiUrl}/Icons/${src}`;
  } catch {
    setError(true);
  }

  return (
    <img
      src={fullSrc}
      alt={alt}
      className="w-12 h-12 object-cover rounded"
      onError={() => setError(true)}
      loading="lazy"
    />
  );
}
