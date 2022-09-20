import * as yup from "yup";

export const contactSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(4, "Name requires at least 4 characters")
    .max(127, "Name cannot exceed 127 characters"),
  email: yup.string().required("Email is required.").email("Email is invalid."),
  phone: yup
    .string()
    .required("Phone is required.")
    .min(8, "Phone requires at least 4 characters")
    .max(127, "Phone cannot exceed 127 characters"),
});
