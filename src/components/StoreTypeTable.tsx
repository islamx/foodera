"use client";

import { useEffect, useState } from "react";
import { StoreType } from "../types/storeType";
import { deleteStoreType, getStoreTypes } from "../lib/api";
import Table from "./shared/Table";
import StoreTypeRow from "./shared/StoreTypeRow";
import StoreTypeModal from "./StoreTypeModal";
import { toast } from "react-hot-toast";

export default function StoreTypeTable() {
  const [storeTypes, setStoreTypes] = useState<StoreType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedItem, setSelectedItem] = useState<StoreType | null>(null);

  const refreshData = async () => {
    try {
      const data = await getStoreTypes(1, 50); // pagination params
      setStoreTypes(data);
    } catch (error) {
      console.error("Error refreshing store types", error);
      toast.error("فشل في تحميل الأقسام");
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleAdd = () => {
    setSelectedItem(null);
    setMode("add");
    setIsModalOpen(true);
  };

  const handleEdit = (store: StoreType) => {
    setSelectedItem(store);
    setMode("edit");
    setIsModalOpen(true);
  };

  const handleDelete = async (typeId: string | number) => {
    const confirm = window.confirm("هل أنت متأكد أنك تريد حذف هذا القسم؟");
    if (!confirm) return;

    try {
      // Instead of deleting, we can deactivate the store type
      toast("الحذف غير متاح حاليًا — برجاء التواصل مع الإدارة");
    } catch (error) {
      toast.error("فشل في العملية");
      console.error("delete error", error);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-20 left-4 md:left-6 z-40">
        <button
          onClick={handleAdd}
          className="bg-[#FFD600] hover:bg-[#bfa100] text-[#003366] rounded-full w-12 h-12 md:w-14 md:h-14 shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
          title="إضافة قسم جديد"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* احذف جميع النصوص والعناوين فوق الجدول */}
      <div className="w-full bg-white rounded-lg border border-gray-200 p-0 overflow-x-auto mb-8">
        {/* الهيدر الأصفر الجديد مع البحث */}
        <div className="bg-[#FFD600] px-6 py-3 flex items-center justify-between text-right">
          <div>
            <div className="text-lg font-bold text-[#bfa100]">أقسام التطبيق</div>
            <div className="text-xs text-gray-700">جدول خاص بالأقسام</div>
          </div>
          <input
            type="text"
            placeholder="ابحث"
            className="px-3 py-1 rounded bg-white border border-gray-200 text-xs text-right w-40"
            style={{ direction: "rtl" }}
          />
        </div>
        <Table headers={["الاسم بالعربي", "الاسم بالإنجليزي", "الصورة", "الحالة", "حذف", "تعديل"]}>
          {storeTypes.map((type, index) => (
            <StoreTypeRow
              key={`${type.Id}-${index}`}
              type={type}
              index={index}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </Table>
      </div>

      <StoreTypeModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={refreshData}
        mode={mode}
        initialValues={
          selectedItem
            ? {
              TypeId: selectedItem.Id, // استخدام Id بدلاً من TypeId
              Name_Ar: selectedItem.Name_Ar,
              Name_En: selectedItem.Name_En,
              IsActive: selectedItem.IsActive ?? false,
              Icon_path: selectedItem.Icon_path ?? null,
            }
            : undefined
        }
      />
    </>
  );
}
