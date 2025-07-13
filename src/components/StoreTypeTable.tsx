"use client";

import { useEffect, useState } from "react";
import { StoreType } from "../types/storeType";
import { getStoreTypes } from "../lib/api";
import Table from "./shared/Table";
import StoreTypeRow from "./shared/StoreTypeRow";
import StoreTypeModal from "./StoreTypeModal";

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

  const handleEdit = (store: StoreType) => {
    setSelectedItem(store);
    setMode("edit");
    setIsModalOpen(true);
  };

  return (
    <>
      <Table headers={["#", "الصورة", "الاسم بالعربي", "الاسم بالإنجليزي", "الحالة", "إجراءات"]}>
        {storeTypes.map((type, index) => (
          <StoreTypeRow key={type.TypeId} type={type} index={index} onEdit={handleEdit} />
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
