import { useEffect } from "react";
import StoreTypeForm from "./forms/StoreTypeForm";

type StoreTypeModalProps = {
  open: boolean;
  onSuccess?: () => void;
  onClose: () => void;
  mode?: "add" | "edit";
  initialValues?: {
    TypeId?: string; // Changed to string to match API response
    Name_Ar: string;
    Name_En: string;
    IsActive: boolean;
    Icon_path: File | string | null;
  };
};

export default function StoreTypeModal({
  open,
  onClose,
  onSuccess,
  mode = "add",
  initialValues,
}: StoreTypeModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  // Ensure Icon_path is string|null (not File)
  const safeInitialValues = initialValues
    ? {
        ...initialValues,
        Icon_path:
          typeof initialValues.Icon_path === "string" || initialValues.Icon_path === null
            ? initialValues.Icon_path
            : null,
      }
    : undefined;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {mode === "add" ? "إضافة قسم جديد" : "تعديل قسم"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl leading-none"
          >
            ×
          </button>
        </div>

        <StoreTypeForm
          onClose={onClose}
          onSuccess={onSuccess}
          mode={mode}
          initialValues={safeInitialValues}
          typeId={initialValues?.TypeId}
        />
      </div>
    </div>
  );
}
