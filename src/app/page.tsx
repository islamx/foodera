"use client";
import Sidebar from "@/components/Sidebar";
import StoreTypeTable from "@/components/StoreTypeTable";
import Topbar from "@/components/Topbar";
import Button from "@/components/shared/Button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-black flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-4">
          <h1 className="text-xl font-semibold mb-4">إدارة أقسام التطبيق</h1>

          <div className="flex justify-end mb-4">
            <Button onClick={() => console.log("إضافة قسم جديد")}>
              + إضافة قسم جديد
            </Button>
          </div>

          <StoreTypeTable />
        </main>
      </div>
    </div>
  );
}
