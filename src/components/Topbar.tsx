import { FaUserCircle } from "react-icons/fa";
import NotificationManager from "./shared/NotificationManager";

export default function Topbar() {
  return (
    <header className="w-full sticky top-0 z-50 flex items-center justify-between bg-white px-6 py-2 shadow-md border-b" style={{borderBottomColor: '#F3F3F3', direction: 'rtl'}}>
      {/* الشعار والروابط على اليمين */}
      <div className="flex items-center gap-6">
        <span className="text-2xl font-bold text-yellow-500 ml-2 mr-16">foodera</span>
        <nav className="flex gap-4 text-gray-700 font-semibold">
          <a href="#" className="hover:text-yellow-500">الرئيسية</a>
          <a href="#" className="hover:text-yellow-500">المتاجر</a>
          <a href="#" className="hover:text-yellow-500">المستخدمين</a>
          <a href="#" className="hover:text-yellow-500">التسوق</a>
        </nav>
      </div>
      {/* المستخدم والإشعارات على اليسار */}
      <div className="flex items-center gap-4 flex-row-reverse">
        <div className="flex items-center gap-2">
          <FaUserCircle size={32} className="text-gray-400" />
          <span className="font-semibold text-gray-700">Admin</span>
        </div>
        <NotificationManager />
      </div>
    </header>
  );
}
