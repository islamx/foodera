"use client";

import { useEffect, useState } from "react";
import { StoreType } from "../types/storeType";
import { getStoreTypes } from "../lib/api";
import Table from "./shared/Table";
import StoreTypeRow from "./shared/StoreTypeRow";

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
        <StoreTypeRow key={type.TypeId} type={type} index={index} />
      ))}
    </Table>
  );
}
