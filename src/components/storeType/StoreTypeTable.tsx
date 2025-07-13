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

  const handleDelete = async (typeId: string | number) => {
    const confirm = window.confirm("هل أنت متأكد أنك تريد حذف هذا القسم؟");
    if (!confirm) return;
    toast("الحذف غير متاح حاليًا — برجاء التواصل مع الإدارة");
  };

  return (
    <>
      <FloatingActionButton onClick={handleAdd} title="إضافة قسم جديد" />
      <div className="w-full bg-white rounded-lg border border-gray-200 p-0 mb-8 px-2 md:px-0">
        <StoreTypeTableHeader search={search} setSearch={setSearch} setCurrentPage={setCurrentPage} />
        {loading ? (
          <Loader />
        ) : (
          <>
            <StoreTypeTableContent
              currentItems={currentItems}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
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
