import { FaStore, FaPlus, FaCog } from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="w-full md:w-60 bg-gray-100 border-r p-4 flex md:flex-col gap-4 md:gap-6 md:min-h-screen">
      <FaStore className="text-2xl" title="Dashboard" />
      <FaPlus className="text-2xl" title="إضافة" />
      <FaCog className="text-2xl" title="الإعدادات" />
    </aside>
  );
}
