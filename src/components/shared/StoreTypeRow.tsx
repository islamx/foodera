import { StoreType } from "@/types/storeType";
import Button from "./Button";
import { FaImage } from "react-icons/fa";
import { useState } from "react";

type StoreTypeRowProps = {
  type: StoreType;
  index: number;
  onEdit: (store: StoreType) => void;
  onDelete: (id: number) => void;
};

export default function StoreTypeRow({ type, index, onEdit, onDelete }: StoreTypeRowProps) {
  const [imgError, setImgError] = useState(false); // ⬅️ للتحكم في حالة فشل الصورة

  const imageUrl =
    type.Icon_path?.startsWith("http") || type.Icon_path?.startsWith("/")
      ? type.Icon_path
      : `${process.env.NEXT_PUBLIC_API_URL}/Icons/${type.Icon_path}`;

  return (
    <tr className="border-b">
      <td className="p-2">{index + 1}</td>

      <td className="p-2">
        {!imgError && type.Icon_path ? (
          <img
            src={imageUrl}
            alt={type.Name_Ar}
            onError={() => setImgError(true)}
            className="w-12 h-12 object-cover rounded"
            loading="lazy"
          />
        ) : (
          <div className="w-12 h-12 flex items-center justify-center bg-gray-100 text-gray-400 rounded">
            <FaImage size={20} />
          </div>
        )}
      </td>

      <td className="p-2">{type.Name_Ar}</td>
      <td className="p-2">{type.Name_En}</td>
      <td className="p-2">
        {type.IsActive === null || type.IsActive === false ? "غير مفعل" : "مفعل"}
      </td>
      <td className="p-2 space-x-2 text-sm">
        <Button
          variant="outline"
          className="text-blue-600 hover:underline"
          onClick={() => onEdit(type)}
        >
          تعديل
        </Button>
        <Button
          variant="danger"
          className="hover:underline"
          onClick={() => onDelete(type.TypeId)}
        >
          حذف
        </Button>
      </td>
    </tr>
  );
}
