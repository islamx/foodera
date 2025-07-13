import * as Yup from "yup";

/**
 * Schema for creating or editing a store type
 */
export const storeTypeSchema = Yup.object().shape({
  Name_Ar: Yup.string()
    .required("الاسم بالعربي مطلوب")
    .min(2, "الاسم بالعربي يجب أن يكون على الأقل حرفين"),

  Name_En: Yup.string()
    .required("الاسم بالإنجليزي مطلوب")
    .min(2, "الاسم بالإنجليزي يجب أن يكون على الأقل حرفين")
    .matches(/^[A-Za-z0-9\s]+$/, "الاسم بالإنجليزي يجب أن يحتوي على أحرف وأرقام فقط"),

  IsActive: Yup.boolean().required("تحديد حالة القسم مطلوب"),

  Icon_path: Yup.string()
    .required("اسم الصورة مطلوب")
    .min(3, "اسم الصورة غير صالح")
});
