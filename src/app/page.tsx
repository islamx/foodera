import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-4">
          <h1 className="text-xl font-semibold mb-4">إدارة أقسام التطبيق</h1>
          {/* جدول الأقسام هيتحط هنا لاحقًا */}
        </main>
      </div>
    </div>
  );
}
