"use client";

import { Formik, Form } from "formik";
import { storeTypeSchema } from "../../validation/storeTypeSchema";

import InputField from "../shared/InputField";
import CheckboxField from "../shared/CheckboxField";
import ImageUploadField from "../shared/ImageUploadField";
import Button from "../shared/Button";

type StoreTypeFormProps = {
  onClose: () => void;
};

export default function StoreTypeForm({ onClose }: StoreTypeFormProps) {
  return (
    <Formik
      initialValues={{
        Name_Ar: "",
        Name_En: "",
        IsActive: true,
        Icon_path: null,
      }}
      validationSchema={storeTypeSchema}
      onSubmit={(values) => {
        console.log("✅ Submitted values:", values);
        onClose();
      }}
    >
      <Form className="space-y-4">
        <InputField name="Name_Ar" label="الاسم بالعربي" />
        <InputField name="Name_En" label="الاسم بالإنجليزي" />
        <CheckboxField name="IsActive" label="القسم مفعل" />
        <ImageUploadField name="Icon_path" label="صورة القسم" />

        <div className="pt-6">
          <Button type="submit" className="w-full">
            حفظ القسم
          </Button>
        </div>
      </Form>
    </Formik>
  );
}
