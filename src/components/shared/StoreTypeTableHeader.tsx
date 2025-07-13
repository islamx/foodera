import React from "react";
import SearchInput from "./SearchInput";

type StoreTypeTableHeaderProps = {
  search: string;
  setSearch: (v: string) => void;
  setCurrentPage: (n: number) => void;
};

export default function StoreTypeTableHeader({ search, setSearch, setCurrentPage }: StoreTypeTableHeaderProps) {
  return (
    <div className="bg-[#FFD600] px-3 md:px-6 py-3 flex flex-col md:flex-row md:items-center justify-between text-right gap-2 md:gap-0">
      <div>
        <div className="text-base md:text-lg font-bold text-[#bfa100]">أقسام التطبيق</div>
        <div className="text-xs text-gray-700">جدول خاص بالأقسام</div>
      </div>
      <SearchInput
        value={search}
        onChange={e => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        placeholder="ابحث"
      />
    </div>
  );
} 