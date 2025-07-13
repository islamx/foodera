import { StoreType } from "../types/storeType";

// Fetch all store types
export async function getStoreTypes(): Promise<StoreType[]> {
  const response = await fetch("/api/store-types");

  if (!response.ok) throw new Error("Failed to fetch store types");

  const data = await response.json();
  return data;
}

// Add new store type (mocked version until API is working)
export async function addStoreType(values: {
  Name_Ar: string;
  Name_En: string;
  IsActive: boolean;
  Icon_path: File | null;
}) {
  // Simulate sending data (mock)
  console.log("📦 Mock POST request payload:", values);

  // Simulate async delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: "Successfully added (mocked)" });
    }, 1000);
  });

  /*
  // Real implementation (when API is available)
  const formData = new FormData();
  formData.append("Name_Ar", values.Name_Ar);
  formData.append("Name_En", values.Name_En);
  formData.append("IsActive", String(values.IsActive));

  if (values.Icon_path) {
    formData.append("Icon", values.Icon_path); // name expected by backend
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/StoreTypes/CreateStoreType`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to add store type");
  }

  const result = await response.json();
  return result;
  */
}
