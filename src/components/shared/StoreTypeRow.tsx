import { StoreType } from "@/types/storeType";
import Button from "./Button";

type StoreTypeRowProps = {
  type: StoreType;
  index: number;
  onEdit: (store: StoreType) => void;
};

export default function StoreTypeRow({ type, index, onEdit }: StoreTypeRowProps) {
  return (
    <tr className="border-b">
      <td className="p-2">{index + 1}</td>
      <td className="p-2">
        {type.Icon_path && (
          <img
            src={
              type.Icon_path.startsWith("http") || type.Icon_path.startsWith("/")
                ? type.Icon_path
                : `${process.env.NEXT_PUBLIC_API_URL}/Icons/${type.Icon_path}`
            }
            alt={type.Name_Ar}
            className="w-12 h-12 object-cover rounded"
          />
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
        <Button variant="danger" className="hover:underline">
          حذف
        </Button>
      </td>
    </tr>
  );
}
