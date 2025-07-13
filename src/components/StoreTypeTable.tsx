"use client";

import { useEffect, useState } from "react";
import { StoreType } from "../types/storeType";
import { getStoreTypes } from "../lib/api";
import Table from "./shared/Table";

export default function StoreTypeTable() {
  const [storeTypes, setStoreTypes] = useState<StoreType[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getStoreTypes();
        console.log("storeTypes:", data);
        setStoreTypes(data);
      } catch (error) {
        console.error("Error fetching store types", error);
      }
    }

    fetchData();
  }, []);

  return (
    <Table headers={["#", "الصورة", "الاسم بالعربي", "الاسم بالإنجليزي", "الحالة"]}>
      {storeTypes.map((type, index) => (
        <tr key={type.TypeId} className="border-b">
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
        </tr>
      ))}
    </Table>
  );
}
