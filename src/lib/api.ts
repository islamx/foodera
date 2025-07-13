import { StoreType } from "../types/storeType";

type StoreTypeInput = {
  Name_Ar: string;
  Name_En: string;
  IsActive: boolean;
  Icon_path: File | string | null;
};

// Fetch all store types
export async function getStoreTypes(): Promise<StoreType[]> {
  const response = await fetch("/api/store-types");

  if (!response.ok) throw new Error("Failed to fetch store types");

  const data = await response.json();
  return data;
}

// Shared function to build FormData
function buildStoreTypeFormData(values: StoreTypeInput): FormData {
  const formData = new FormData();
  formData.append("Name_Ar", values.Name_Ar);
  formData.append("Name_En", values.Name_En);
  formData.append("IsActive", String(values.IsActive));

  if (values.Icon_path instanceof File) {
    formData.append("Icon", values.Icon_path);
  }

  return formData;
}

// Add new store type (mock)
export async function addStoreType(values: StoreTypeInput) {
  console.log("📦 Mock ADD request payload:", values);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: "Successfully added (mock)" });
    }, 1000);
  });

  /*
  const formData = buildStoreTypeFormData(values);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/StoreTypes/CreateStoreType`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("Failed to add store type");

  return await response.json();
  */
}

// Update existing store type (mock)
export async function updateStoreType(values: StoreTypeInput) {
  console.log("🛠️ Mock UPDATE request payload:", values);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: "Successfully updated (mock)" });
    }, 1000);
  });

  /*
  const formData = buildStoreTypeFormData(values);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/StoreTypes/Update`, {
    method: "PUT",
    body: formData,
  });

  if (!response.ok) throw new Error("Failed to update store type");

  return await response.json();
  */
}

// Unified entry point
export async function addOrUpdateStoreType(values: StoreTypeInput, mode: "add" | "edit") {
  return mode === "add" ? addStoreType(values) : updateStoreType(values);
}
