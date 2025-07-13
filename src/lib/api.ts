import { StoreType } from "../types/storeType";

export type StoreTypeInput = {
  Name_Ar: string;
  Name_En: string;
  IsActive: boolean;
  Icon_path: File | string | null;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

// ===================================================
// ✅ Get all store types (with pagination support)
// ===================================================
export async function getStoreTypes(page = 1, pageSize = 50): Promise<StoreType[]> {
  const res = await fetch(`${API_BASE}/StoreTypes/GetAllTypes?page=${page}&pageSize=${pageSize}`);
  const json = await res.json();

  if (!res.ok || !json.Success) {
    throw new Error(json.Message || "Failed to fetch store types");
  }

  return json.Data;
}



// ===================================================
// ✅ Clean & build Icon_path
// ===================================================
function normalizeIconPath(icon: File | string | null): string {
  return typeof icon === "string"
    ? icon.trim()
        .replace(/^http.*\/Icons\//, "")
        .replace(/^\/Icons\//, "")
    : "";
}

// ===================================================
// ✅ Create a new store type
// ===================================================
export async function addStoreType(values: StoreTypeInput) {
  const body = {
    Id: "0", // API requires Id field even for create (use "0" for new items)
    Name_Ar: values.Name_Ar,
    Name_En: values.Name_En,
    IsActive: values.IsActive,
    Icon_path: normalizeIconPath(values.Icon_path),
  };

  const res = await fetch(`${API_BASE}/StoreTypes/CreateStoreType`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const json = await res.json();
  if (!res.ok || !json.Success) {
    if (json.errors) {
      for (const [field, messages] of Object.entries(json.errors)) {
        // Log validation errors silently
      }
    }
    
    throw new Error(json.Message || "Failed to add store type");
  }

  return json.Data;
}

// ===================================================
// ✅ Update an existing store type
// ===================================================
export async function updateStoreType(id: string | number, values: StoreTypeInput) {
  const body = {
    Id: id.toString(), // API requires Id field for update
    Name_Ar: values.Name_Ar,
    Name_En: values.Name_En,
    IsActive: values.IsActive,
    Icon_path: normalizeIconPath(values.Icon_path),
  };

  const url = `${API_BASE}/StoreTypes/UpdateStoreType/${id}`;

  const res = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch (parseError) {
    throw new Error(`Invalid JSON response: ${text.substring(0, 100)}`);
  }

  if (!res.ok || !json.Success) {
    if (json.errors) {
      for (const [field, messages] of Object.entries(json.errors)) {
        // Log validation errors silently
      }
    }
    throw new Error(json.Message || "فشل في تحديث القسم");
  }
  return json.Data;
}


// ===================================================
// ❌ Delete a store type by ID (API doesn't support DELETE)
// ===================================================
export async function deleteStoreType(typeId: string | number) {
  // API doesn't support DELETE operation
  // We can either:
  // 1. Deactivate the store type instead of deleting
  // 2. Show a message that deletion is not supported
  // 3. Implement soft delete by setting IsActive to false
  
  throw new Error("الحذف غير متاح حاليًا — برجاء التواصل مع الإدارة");
}

// ===================================================
// ✅ Smart helper for add or update modes
// ===================================================
export async function addOrUpdateStoreType(
  values: StoreTypeInput,
  mode: "add" | "edit",
  id?: number
) {
  return mode === "add"
    ? addStoreType(values)
    : updateStoreType(id as number, values);
}
