import { FiHome, FiSettings, FiUsers, FiShoppingCart } from "react-icons/fi";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { useState } from "react";

export default function Sidebar() {
  const [active, setActive] = useState(1); // 1 = Home active by default
  return (
    <aside className="bg-[#FFD600] w-16 fixed right-0 top-0 bottom-0 z-60 flex flex-col items-center py-6 pt-3 gap-2 shadow-md">
      <button className="mb-8" onClick={() => setActive(0)}>
        <IoArrowForwardCircleOutline size={40} className="text-[#003366]" />
      </button>
      <button
        className={`mb-4 rounded-lg p-2 transition-colors ${active === 1 ? 'bg-[#003366]' : ''}`}
        onClick={() => setActive(1)}
      >
        <FiHome size={22} className={active === 1 ? 'text-white' : 'text-[#003366]'} />
      </button>
      <button
        className={`mb-4 rounded-lg p-2 transition-colors ${active === 2 ? 'bg-[#003366]' : ''}`}
        onClick={() => setActive(2)}
      >
        <FiUsers size={22} className={active === 2 ? 'text-white' : 'text-[#003366]'} />
      </button>
      <button
        className={`mb-4 rounded-lg p-2 transition-colors ${active === 3 ? 'bg-[#003366]' : ''}`}
        onClick={() => setActive(3)}
      >
        <FiShoppingCart size={22} className={active === 3 ? 'text-white' : 'text-[#003366]'} />
      </button>
      <button className="mt-auto mb-8">
        <FiSettings size={22} className="text-[#003366]" />
      </button>
    </aside>
  );
}
