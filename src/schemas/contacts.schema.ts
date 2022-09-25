import * as yup from "yup";

export const contactSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .min(4, "First requires at least 4 characters")
    .max(127, "First cannot exceed 127 characters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(4, "Last requires at least 4 characters")
    .max(127, "Last cannot exceed 127 characters"),
  email: yup.string().required("Email is required.").email("Email is invalid."),
  phone: yup
    .string()
    .required("Telephone is required")
    .min(6, "Phone requires at least 6 characters")
    .max(14, "Telephone cannot exceed 14 characters"),
});
