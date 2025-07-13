"use client";

import { Formik, Form } from "formik";
import { storeTypeSchema } from "../../validation/storeTypeSchema";
import { addStoreType } from "../../lib/api";
import { toast } from "react-hot-toast";
import InputField from "../shared/InputField";
import CheckboxField from "../shared/CheckboxField";
import ImageUploadField from "../shared/ImageUploadField";
import Button from "../shared/Button";

type StoreTypeFormProps = {
  onClose: () => void;
  mode?: "add" | "edit";
  initialValues?: {
    Name_Ar: string;
    Name_En: string;
    IsActive: boolean;
    Icon_path: File | string | null;
  };
};

export default function StoreTypeForm({
  onClose,
  mode = "add",
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
          await addStoreType(values);
          toast.success(mode === "edit" ? "تم تعديل القسم" : "تم إضافة القسم");
          onClose();
        } catch (error) {
          toast.error("فشل في " + (mode === "edit" ? "تعديل" : "إضافة") + " القسم");
          console.error("فشل في العملية", error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <Form className="space-y-4">
        <InputField name="Name_Ar" label="الاسم بالعربي" />
        <InputField name="Name_En" label="الاسم بالإنجليزي" />
        <CheckboxField name="IsActive" label="القسم مفعل" />
        <ImageUploadField name="Icon_path" label="صورة القسم" />

        <div className="pt-6">
          <Button type="submit" className="w-full">
            {mode === "edit" ? "حفظ التعديلات" : "حفظ القسم"}
          </Button>
        </div>
      </Form>
    </Formik>
  );
}
