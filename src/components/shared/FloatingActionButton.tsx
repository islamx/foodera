import React from "react";
import Button from "./Button";

type FloatingActionButtonProps = {
  onClick: () => void;
  title?: string;
  showText?: boolean;
};

export default function FloatingActionButton({ onClick, title, showText = false }: FloatingActionButtonProps) {
  return (
    <div className="fixed bottom-24 md:bottom-20 left-2 md:left-4 lg:left-6 z-40">
      <Button
        onClick={onClick}
        title={title || "إضافة قسم جديد"}
        className={`bg-[#FFD600] hover:bg-[#bfa100] text-[#003366] rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 ${
          showText ? 'w-auto px-3 py-2 gap-1.5 text-xs md:text-sm' : 'w-12 h-12 md:w-14 md:h-14'
        }`}
      >
        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        {showText && (
          <span className="font-semibold">أضف قسم</span>
        )}
      </Button>
    </div>
  );
} 