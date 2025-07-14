import React from "react";
import Table from "../shared/Table";
import StoreTypeRow from "./StoreTypeRow";
import { StoreType } from "../../types/storeType";
import { FaSearch } from "react-icons/fa";

type StoreTypeTableContentProps = {
  currentItems: StoreType[];
  handleEdit: (store: StoreType) => void;
  handleDelete: (id: string | number) => void;
};

export default function StoreTypeTableContent({ currentItems, handleEdit, handleDelete }: StoreTypeTableContentProps) {
  return (
    <Table headers={["الاسم بالعربي", "الاسم بالإنجليزي", "الصورة", "الحالة", "حذف", "تعديل"]}>
      {currentItems.length === 0 ? (
        <tr className="border-none">
          <td colSpan={6} className="py-8 text-center text-gray-400 text-sm">
            <div className="flex flex-col items-center gap-2">
              <FaSearch size={32} className="mb-1" />
              <div>لم يتم العثور على نتائج مطابقة لبحثك</div>
              <div className="text-xs text-gray-300">جرب تعديل كلمة البحث أو التأكد من صحتها</div>
            </div>
          </td>
        </tr>
      ) : (
        currentItems.map((type, index) => (
          <StoreTypeRow
            key={`${type.Id}-${index}`}
            type={type}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))
      )}
    </Table>
  );
} 