import React from "react";
import Button from "./Button";
import { FaPlus } from "react-icons/fa";

type FloatingActionButtonProps = {
  onClick: () => void;
  title?: string;
  showText?: boolean;
};

export default function FloatingActionButton({ onClick, title, showText = false }: FloatingActionButtonProps) {
  return (
    <div className="fixed bottom-20 sm:bottom-24 left-2 sm:left-4 lg:left-6 z-40">
      <Button
        onClick={onClick}
        title={title || "إضافة قسم جديد"}
        className={`bg-[#FFD600] hover:bg-[#bfa100] text-[#003366] rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 ${
          showText ? 'w-auto px-2 sm:px-3 py-2 gap-1 sm:gap-1.5 text-xs sm:text-sm' : 'w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14'
        }`}
      >
        <FaPlus className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
        {showText && (
          <span className="font-semibold">أضف قسم</span>
        )}
      </Button>
    </div>
  );
} 