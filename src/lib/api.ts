import { StoreType } from "../types/storeType";

export type StoreTypeInput = {
  Name_Ar: string;
  Name_En: string;
  IsActive: boolean;
  Icon_path: File | string | null;
};

// ===================================================
// ✅ Get all store types (with pagination support)
// ===================================================
export async function getStoreTypes(page = 1, pageSize = 50): Promise<StoreType[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/StoreTypes/GetAllTypes?page=${page}&pageSize=${pageSize}`
  );
  const json = await res.json();

  if (!res.ok || !json.Success) {
    throw new Error(json.Message || "Failed to fetch store types");
  }

  return json.Data;
}

// ===================================================
// ✅ Get a single store type by ID
// ===================================================
export async function getStoreTypeById(id: number): Promise<StoreType> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/StoreTypes/GetStoreTypeById/${id}`);
  const json = await res.json();

  if (!res.ok || !json.Success) {
    throw new Error(json.Message || "Failed to fetch store type details");
  }

  return json.Data;
}

// ===================================================
// ✅ Create a new store type
// ===================================================
export async function addStoreType(values: StoreTypeInput) {
  const body = {
    Name_Ar: values.Name_Ar,
    Name_En: values.Name_En,
    IsActive: values.IsActive,
    Icon_path: typeof values.Icon_path === "string" ? values.Icon_path : "",
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/StoreTypes/CreateStoreType`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const json = await res.json();
  if (!res.ok || !json.Success) {
    throw new Error(json.Message || "Failed to add store type");
  }

  return json.Data;
}

// ===================================================
// ✅ Update an existing store type
// ===================================================
export async function updateStoreType(id: number, values: StoreTypeInput) {
  const body = {
    Name_Ar: values.Name_Ar,
    Name_En: values.Name_En,
    IsActive: values.IsActive,
    Icon_path: typeof values.Icon_path === "string" ? values.Icon_path : "",
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/StoreTypes/UpdateStoreType/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const json = await res.json();
  if (!res.ok || !json.Success) {
    throw new Error(json.Message || "Failed to update store type");
  }

  return json.Data;
}

// ===================================================
// ✅ Delete a store type by ID
// ===================================================
export async function deleteStoreType(typeId: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/StoreTypes/DeleteStoreType/${typeId}`,
    { method: "DELETE" }
  );

  const json = await res.json();
  if (!res.ok || !json.Success) {
    throw new Error(json.Message || "Failed to delete store type");
  }

  return json.Data;
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
