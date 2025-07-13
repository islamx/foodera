import React from "react";
import Table from "../shared/Table";
import StoreTypeRow from "./StoreTypeRow";
import { StoreType } from "../../types/storeType";

type StoreTypeTableContentProps = {
  currentItems: StoreType[];
  handleEdit: (store: StoreType) => void;
  handleDelete: (id: string | number) => void;
};

export default function StoreTypeTableContent({ currentItems, handleEdit, handleDelete }: StoreTypeTableContentProps) {
  return (
    <Table headers={["الاسم بالعربي", "الاسم بالإنجليزي", "الصورة", "الحالة", "حذف", "تعديل"]}>
      {currentItems.map((type, index) => (
        <StoreTypeRow
          key={`${type.Id}-${index}`}
          type={type}
          index={index}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </Table>
  );
} 