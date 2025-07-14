import React from "react";

type SearchInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export default function SearchInput({ value, onChange, placeholder }: SearchInputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder || "ابحث"}
      className="px-4 py-2 rounded bg-white border border-gray-200 text-xs text-right w-full md:w-40 rtl focus:outline-none hover:outline-none"
    />
  );
} 