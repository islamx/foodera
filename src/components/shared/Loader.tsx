import React from "react";

export default function Loader() {
  return (
    <div className="flex justify-center items-center" style={{ minHeight: '250px' }}>
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-yellow-400 border-t-transparent"></div>
    </div>
  );
} 