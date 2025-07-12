import { StoreType } from "../types/storeType";

export async function getStoreTypes(): Promise<StoreType[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/StoreType/GetAll`);
  
  if(!response.ok) throw new Error("Failed to fetch store types");
  return response.json();
}