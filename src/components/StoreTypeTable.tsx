"use client";

import { useEffect, useState } from "react";
import { StoreType } from "../types/storeType";
import { deleteStoreType, getStoreTypes } from "../lib/api";
import Table from "./shared/Table";
import StoreTypeRow from "./shared/StoreTypeRow";
import StoreTypeModal from "./StoreTypeModal";
import Button from "./shared/Button";
import { toast } from "react-hot-toast";

export default function StoreTypeTable() {
  const [storeTypes, setStoreTypes] = useState<StoreType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedItem, setSelectedItem] = useState<StoreType | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getStoreTypes();
        setStoreTypes(data);
      } catch (error) {
        console.error("Error fetching store types", error);
      }
    }

    fetchData();
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

  const handleDelete = async (typeId: number) => {
    const confirm = window.confirm("هل أنت متأكد أنك تريد حذف هذا القسم؟");
    if (!confirm) return;

    try {
      await deleteStoreType(typeId);
      toast.success("تم حذف القسم");
      setStoreTypes((prev) => prev.filter((s) => s.TypeId !== typeId));
    } catch (error) {
      toast.error("فشل في حذف القسم");
      console.error("delete error", error);
    }
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={handleAdd}>+ إضافة قسم جديد</Button>
      </div>

      <Table headers={["#", "الصورة", "الاسم بالعربي", "الاسم بالإنجليزي", "الحالة", "إجراءات"]}>
        {storeTypes.map((type, index) => (
          <StoreTypeRow
            key={type.TypeId}
            type={type}
            index={index}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </Table>

      <StoreTypeModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={mode}
        initialValues={
          selectedItem
            ? {
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
