import { FaUserCircle } from "react-icons/fa";
import NotificationManager from "./shared/NotificationManager";

export default function Topbar() {
  return (
    <header className="w-full sticky top-0 z-50 flex items-center justify-between bg-white px-3 sm:px-6 py-2 shadow-md border-b border-[#F3F3F3] rtl">
      {/* الشعار والروابط على اليمين */}
      <div className="flex items-center gap-3 sm:gap-6">
        <span className="text-lg sm:text-2xl font-bold text-yellow-500 ml-1 sm:ml-2 mr-8 sm:mr-16">foodera</span>
        <nav className="hidden sm:flex gap-2 sm:gap-4 text-gray-700 font-semibold text-sm">
          <a href="#" className="hover:text-yellow-500">الرئيسية</a>
          <a href="#" className="hover:text-yellow-500">المتاجر</a>
          <a href="#" className="hover:text-yellow-500">المستخدمين</a>
          <a href="#" className="hover:text-yellow-500">التسوق</a>
        </nav>
      </div>
      {/* المستخدم والإشعارات على اليسار */}
      <div className="flex items-center gap-2 sm:gap-4 flex-row-reverse">
        <div className="flex items-center gap-1 sm:gap-2">
          <FaUserCircle size={24} className="sm:w-8 sm:h-8 text-gray-400" />
          <span className="font-semibold text-gray-700 text-sm sm:text-base hidden sm:block">Admin</span>
        </div>
        <NotificationManager />
      </div>
    </header>
  );
}
