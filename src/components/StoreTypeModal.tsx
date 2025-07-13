import { useEffect } from "react";
import StoreTypeForm from "./forms/StoreTypeForm";

type StoreTypeModalProps = {
  open: boolean;
  onClose: () => void;
  mode?: "add" | "edit";
};

export default function StoreTypeModal({
  open,
  onClose,
  mode = "add",
}: StoreTypeModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  if (!open) return null;

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

        <StoreTypeForm onClose={onClose} />
      </div>
    </div>
  );
}
