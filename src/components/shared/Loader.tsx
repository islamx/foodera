import React from "react";

export default function Loader() {
  return (
    <div className="flex justify-center items-center min-h-[250px]">
      <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
    </div>
  );
} 