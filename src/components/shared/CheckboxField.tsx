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
    <div className={`flex items-center gap-2 ${className}`}>
      <label htmlFor={name} className="flex items-center cursor-pointer select-none">
        <input
          id={name}
          {...field}
          type="checkbox"
          checked={field.value}
          className="appearance-none w-5 h-5 rounded-full border-2 border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 transition-all duration-200 focus:ring-2 focus:ring-blue-200 focus:outline-none"
        />
      </label>
      <label htmlFor={name} className="cursor-pointer text-sm font-medium text-gray-700">
        {label}
      </label>
    </div>
  );
}
