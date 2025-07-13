import { StoreType } from "@/types/storeType";
import Button from "../shared/Button";
import { FaEdit, FaTrash } from "react-icons/fa";
import StoreImage from "../shared/StoreImage";

type StoreTypeRowProps = {
  type: StoreType;
  index: number;
  onEdit: (store: StoreType) => void;
  onDelete: (id: string | number) => void;
};

export default function StoreTypeRow({ type, index, onEdit, onDelete }: StoreTypeRowProps) {

  return (
    <tr className="border-b border-gray-200">
      <td className="p-2 text-right min-w-[120px]">{type.Name_Ar}</td>
      <td className="p-2 text-right min-w-[120px]">{type.Name_En}</td>
      <td className="p-2 text-right min-w-[80px]">
        <StoreImage src={type.Icon_path ?? null} alt={type.Name_Ar} />
      </td>
      <td className="p-2 text-right min-w-[80px]">
        {type.IsActive === null || type.IsActive === false ? (
          <span className="inline-block px-2 py-0.5 text-[11px] rounded-full bg-[#e0e0e0] text-gray-700 font-semibold">غير مفعل</span>
        ) : (
          <span className="inline-block px-2 py-0.5 text-[11px] rounded-full bg-[#90caf9] text-blue-900 font-semibold">مفعل</span>
        )}
      </td>
      <td className="p-2 text-right text-sm min-w-[80px]">
        <Button
          variant="danger"
          className="bg-[#ffb3b3] text-red-900 flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold hover:bg-red-200 transition-all"
          onClick={() => onDelete(type.Id)}
        >
          <FaTrash size={12} /> حذف
        </Button>
      </td>
      <td className="p-2 text-right text-sm min-w-[80px]">
        <Button
          variant="outline"
          className="bg-[#B39DDB] text-white flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition-all hover:bg-[#D1C4E9] hover:text-[#512DA8]"
          onClick={() => onEdit(type)}
        >
          <FaEdit size={12} /> تعديل
        </Button>
      </td>
    </tr>
  );
}
