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
      placeholder={placeholder || "ابحث"}
      className="px-3 py-1 rounded bg-white border border-gray-200 text-xs text-right w-full md:w-40"
      style={{ direction: "rtl" }}
      value={value}
      onChange={onChange}
    />
  );
} 