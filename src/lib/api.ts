import { StoreType } from "../types/storeType";

export async function getStoreTypes(): Promise<StoreType[]> {
  const response = await fetch("/api/store-types");

  if (!response.ok) throw new Error("Failed to fetch store types");

  const data = await response.json();
  return data;
}