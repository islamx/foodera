import React from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function getPages(current: number, total: number) {
  const pages: (number | string)[] = [];
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
    return pages;
  }
  // Always show first, last, current, and neighbors
  pages.push(1);
  if (current > 4) pages.push("...");
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
    if (i !== 1 && i !== total) pages.push(i);
  }
  if (current < total - 3) pages.push("...");
  pages.push(total);
  return pages;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;
  const pages = getPages(currentPage, totalPages);
  return (
    <div className="flex justify-center items-center gap-1 my-4 flex-wrap">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="px-2 sm:px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50 text-xs sm:text-sm"
      >
        السابق
      </button>
      {pages.map((p, i) =>
        typeof p === "number" ? (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm ${currentPage === p ? 'bg-yellow-400 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            {p}
          </button>
        ) : (
          <span key={"dots-" + i} className="px-2 text-gray-400 select-none">...</span>
        )
      )}
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-2 sm:px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50 text-xs sm:text-sm"
      >
        التالي
      </button>
    </div>
  );
} 