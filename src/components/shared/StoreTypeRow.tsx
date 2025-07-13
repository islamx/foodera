import { StoreType } from "../types/storeType";

type StoreTypeRowProps = {
  type: StoreType;
  index: number;
};

export default function StoreTypeRow({ type, index }: StoreTypeRowProps) {
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
      <td className="p-2 space-x-2 text-sm text-blue-600">
        <button className="hover:underline">تعديل</button>
        <button className="text-red-600 hover:underline">حذف</button>
      </td>
    </tr>
  );
}
