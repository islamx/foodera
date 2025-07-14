"use client";

import { useState, useEffect } from "react";
import { useField, useFormikContext } from "formik";
import { FaImage } from "react-icons/fa";

type ImageUploadFieldProps = {
  name: string;
  label: string;
};

const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ImageUploadField({ name, label }: ImageUploadFieldProps) {
  const [field] = useField(name);
  const { setFieldValue } = useFormikContext();
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (field.value && typeof field.value === "string") {
      if (field.value.startsWith("data:image")) {
        // Base64 string
        setPreviewSrc(field.value);
      } else if (field.value.startsWith("http")) {
        setPreviewSrc(field.value);
      } else if (field.value.startsWith("/Icons")) {
        setPreviewSrc(`${BASE_IMAGE_URL}${field.value}`);
      } else {
        setPreviewSrc(`/api/images/${field.value}`);
      }
      setError(false);
    } else {
      setPreviewSrc(null);
      setError(false);
    }
  }, [field.value]);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Upload the image to the backend
      const formData = new FormData();
      formData.append("file", file);

      // Replace this URL with your actual upload endpoint
      const response = await fetch("https://41.38.56.140/Store.ApI/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      // Assume backend returns { url: "/Icons/your_image.jpg" }
      if (data.url) {
        setFieldValue(name, data.url); // Store the image URL in the form
      }
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.trim();

    if (value.startsWith("http")) {
      const parts = value.split("/");
      value = parts[parts.length - 1]; // Only the image name
    }

    if (value.startsWith("/Icons/")) {
      value = value.replace("/Icons/", ""); // Remove the path
    }

    setFieldValue(name, value);
  };

  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>

      <input
        type="text"
        value={typeof field.value === "string" && !field.value.startsWith("data:image") ? field.value : ""}
        onChange={handleTextChange}
        placeholder="مثال: bakery.png"
        className="w-full border rounded p-2 text-sm"
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="mt-2"
      />

      <div className="mt-2 w-24 h-24 rounded overflow-hidden border flex items-center justify-center bg-gray-50">
        {previewSrc && !error ? (
          <img
            src={previewSrc}
            alt="Preview"
            className="w-full h-full object-cover"
            onError={() => setError(true)}
          />
        ) : (
          <FaImage className="text-gray-400" size={24} />
        )}
      </div>
    </div>
  );
}
