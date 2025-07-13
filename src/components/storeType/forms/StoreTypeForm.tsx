"use client";

import { Formik, Form } from "formik";
import { storeTypeSchema } from "../../../validation/storeTypeSchema";
import { addStoreType, updateStoreType } from "../../../lib/api";
import { toast } from "react-hot-toast";
import InputField from "../../shared/InputField";
import CheckboxField from "../../shared/CheckboxField";
import ImageUploadField from "../../shared/ImageUploadField";
import Button from "../../shared/Button";

type StoreTypeFormProps = {
  onClose: () => void;
  mode?: "add" | "edit";
  onSuccess?: () => void;
  typeId?: string;
  initialValues?: {
    Name_Ar: string;
    Name_En: string;
    IsActive: boolean;
    Icon_path: File | string | null;
  };
};

export default function StoreTypeForm({
  onClose,
  onSuccess,
  mode = "add",
  typeId,
  initialValues,
}: StoreTypeFormProps) {
  return (
    <Formik
      initialValues={
        initialValues ?? {
          Name_Ar: "",
          Name_En: "",
          IsActive: true,
          Icon_path: null,
        }
      }
      validationSchema={storeTypeSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          if (values.Icon_path instanceof File) {
            toast.error("يرجى إدخال اسم الصورة فقط (مثل bakery.png)");
            return;
          }

          if (mode === "edit" && typeId) {
            await updateStoreType(typeId, values);
            toast.success("تم تعديل القسم بنجاح");
            // Add notification for edit
            const windowWithNotification = window as Window & { addNotification?: (type: string, name: string) => void };
            if (typeof window !== 'undefined' && windowWithNotification.addNotification) {
              windowWithNotification.addNotification("edit", values.Name_Ar);
            }
          } else {
            await addStoreType(values);
            toast.success("تم إضافة القسم بنجاح");
            // Add notification for add
            const windowWithNotification = window as Window & { addNotification?: (type: string, name: string) => void };
            if (typeof window !== 'undefined' && windowWithNotification.addNotification) {
              windowWithNotification.addNotification("add", values.Name_Ar);
            }
          }

          onSuccess?.();
          onClose();
        } catch (error) {
          const action = mode === "edit" ? "تعديل" : "إضافة";
          toast.error(`فشل في ${action} القسم`);
          console.error(`فشل في ${action} القسم:`, error);
        } finally {
          setSubmitting(false);
        }
      }}
      
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          <InputField name="Name_Ar" label="الاسم بالعربي" />
          <InputField name="Name_En" label="الاسم بالإنجليزي" />
          <CheckboxField name="IsActive" label="القسم مفعل" />
          <ImageUploadField name="Icon_path" label="صورة القسم" />

          <div className="pt-6">
            <Button
              type="submit"
              className="w-full flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {isSubmitting
                ? "جاري الحفظ..."
                : mode === "edit"
                ? "حفظ التعديلات"
                : "حفظ القسم"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
} 