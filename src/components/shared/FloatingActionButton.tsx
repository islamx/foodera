import React from "react";
import Button from "./Button";

type FloatingActionButtonProps = {
  onClick: () => void;
  title?: string;
};

export default function FloatingActionButton({ onClick, title }: FloatingActionButtonProps) {
  return (
    <div className="fixed bottom-24 md:bottom-20 left-2 md:left-4 lg:left-6 z-40">
      <Button
        onClick={onClick}
        title={title || "إضافة قسم جديد"}
        className="bg-[#FFD600] hover:bg-[#bfa100] text-[#003366] rounded-full w-12 h-12 md:w-14 md:h-14 shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </Button>
    </div>
  );
} 