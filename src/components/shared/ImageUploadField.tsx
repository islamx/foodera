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
      if (field.value.startsWith("http")) {
        setPreviewSrc(field.value);
      } else if (field.value.startsWith("/Icons")) {
        setPreviewSrc(`${BASE_IMAGE_URL}${field.value}`);
      } else {
        setPreviewSrc(`${BASE_IMAGE_URL}/Icons/${field.value}`);
      }
      setError(false);
    } else {
      setPreviewSrc(null);
      setError(false);
    }
  }, [field.value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFieldValue(name, null); // نمنع استخدام الـ file
      alert("⚠️ رفع الصور غير مدعوم حاليًا. استخدم فقط اسم الصورة الموجود على السيرفر.");
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.trim();

    if (value.startsWith("http")) {
      const parts = value.split("/");
      value = parts[parts.length - 1]; // فقط اسم الصورة
    }

    if (value.startsWith("/Icons/")) {
      value = value.replace("/Icons/", ""); // احذف المسار
    }

    setFieldValue(name, value);
  };


  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>

      <input
        type="text"
        value={typeof field.value === "string" ? field.value : ""}
        onChange={handleTextChange}
        placeholder="مثال: bakery.png"
        className="w-full border rounded p-2 text-sm"
      />

      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleInputChange}
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
