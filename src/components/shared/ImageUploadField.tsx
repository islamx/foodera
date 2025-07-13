"use client";

import { useState, useEffect } from "react";
import { useField, useFormikContext } from "formik";

type ImageUploadFieldProps = {
  name: string;
  label: string;
};

export default function ImageUploadField({ name, label }: ImageUploadFieldProps) {
  const [field] = useField(name);
  const { setFieldValue } = useFormikContext();
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (field.value && typeof field.value !== "string") {
      const file = field.value as File;
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else if (typeof field.value === "string") {
      setPreview(field.value); // existing image for edit
    } else {
      setPreview(null);
    }
  }, [field.value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    setFieldValue(name, file || null);
  };

  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="w-full border rounded p-2"
      />
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-24 h-24 object-cover rounded mt-2 border"
        />
      )}
    </div>
  );
}
