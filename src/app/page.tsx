"use client";

import Sidebar from "@/components/Sidebar";
import StoreTypeTable from "@/components/storeType/StoreTypeTable";
import Topbar from "@/components/Topbar";

export default function Home() {
  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 text-black flex flex-col" style={{direction: 'rtl'}}>
      <Topbar />
      <div className="flex flex-1">
        {/* Sidebar على اليسار */}
        <div className="hidden md:block">
          <Sidebar />
        </div>
        {/* Main content مع margin-left بدل margin-right */}
        <div className="flex-1 flex flex-col" style={{marginRight: '4rem'}}>
          <main className="p-4">
            <StoreTypeTable />
          </main>
        </div>
      </div>
      {/* فوتر أبيض ثابت بأسفل الصفحة */}
      <footer className="fixed bottom-0 left-0 w-full bg-white text-[#003366] text-right z-70 font-normal text-[0.75rem] py-[0.5rem]">
        <div className="mr-4">All Rights Reserved. Sourcecode-Eg 2021 ©</div>
      </footer>
    </div>
  );
}
