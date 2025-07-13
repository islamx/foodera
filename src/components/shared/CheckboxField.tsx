"use client";

import { useField } from "formik";

type CheckboxFieldProps = {
  name: string;
  label: string;
  className?: string;
};

export default function CheckboxField({ name, label, className = "" }: CheckboxFieldProps) {
  const [field] = useField({ name, type: "checkbox" });

  return (
    <div className={`flex items-center ${className}`}>
      <input
        id={name}
        {...field}
        type="checkbox"
        checked={field.value}
        className="mr-2"
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
}
