"use client";

import { useEffect, useState } from "react";
import { StoreType } from "../../types/storeType";
import { getStoreTypes } from "../../lib/api";
import Loader from "../shared/Loader";
import Pagination from "../shared/Pagination";
import FloatingActionButton from "../shared/FloatingActionButton";
import StoreTypeTableHeader from "./StoreTypeTableHeader";
import StoreTypeTableContent from "./StoreTypeTableContent";
import StoreTypeModal from "./StoreTypeModal";
import { toast } from "react-hot-toast";
import { FaFolderOpen } from "react-icons/fa";

export default function StoreTypeTable() {
  const [storeTypes, setStoreTypes] = useState<StoreType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedItem, setSelectedItem] = useState<StoreType | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const itemsPerPage = 5;

  const filteredStoreTypes = storeTypes.filter(
    (type) =>
      type.Name_Ar.toLowerCase().includes(search.toLowerCase()) ||
      type.Name_En.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStoreTypes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredStoreTypes.length / itemsPerPage);

  const refreshData = async () => {
    try {
      setLoading(true);
      const data = await getStoreTypes(1, 50);
      setStoreTypes(data);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error refreshing store types", error);
      toast.error("فشل في تحميل الأقسام");
    } finally {
      setLoading(false);
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

  const handleDelete = async () => {
    const confirm = window.confirm("هل أنت متأكد أنك تريد حذف هذا القسم؟");
    if (!confirm) return;
    toast("الحذف غير متاح حاليًا — برجاء التواصل مع الإدارة");
  };

  return (
    <>
      {storeTypes.length === 0 ? (
        <div className="w-full bg-white rounded-lg border border-gray-200 p-8 mb-8 flex flex-col items-center justify-center gap-4">
          <FaFolderOpen size={40} className="text-gray-300 mb-2" />
          <div className="text-gray-500 text-lg font-semibold">لا يوجد أي أقسام حتى الآن</div>
          <div className="text-sm text-gray-400">يمكنك البدء بإضافة أول قسم لإدارة متاجرك بسهولة</div>
          <div className="text-xs text-gray-300">👇 اضغط على الزر بالأسفل للبدء</div>
          <button
            onClick={handleAdd}
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold px-6 py-2 rounded transition"
          >
            أضف أول قسم
          </button>
        </div>
      ) : (
        <>
          <FloatingActionButton onClick={handleAdd} title="إضافة قسم جديد" showText={true} />
          <div className="w-full bg-white rounded-lg border border-gray-200 p-0 mb-8 px-2 md:px-0">
            <StoreTypeTableHeader 
              search={search} 
              setSearch={setSearch} 
              setCurrentPage={setCurrentPage} 
            />
            {loading ? (
              <Loader />
            ) : (
              <div className="flex flex-col">
                <StoreTypeTableContent
                  currentItems={currentItems}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
                <div className="w-full py-2 flex justify-center">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              </div>
            )}
          </div>
        </>
      )}
      <StoreTypeModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={refreshData}
        mode={mode}
        initialValues={
          selectedItem
            ? {
                TypeId: selectedItem.Id,
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
