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
    .min(2, "الاسم بالإنجليزي يجب أن يكون على الأقل حرفين"),
  
  IsActive: Yup.boolean().nullable(),
});
