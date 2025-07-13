"use client";

import { useField } from "formik";

type InputFieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  className?: string;
};

export default function InputField({
  label,
  name,
  type = "text",
  placeholder,
  className = "",
}: InputFieldProps) {
  const [field, meta] = useField(name);

  return (
    <div className={className}>
      <label className="block mb-1 font-medium">{label}</label>
      <input
        {...field}
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full border rounded p-2"
      />
      {meta.touched && meta.error && (
        <p className="text-red-500 text-sm mt-1">{meta.error}</p>
      )}
    </div>
  );
}
