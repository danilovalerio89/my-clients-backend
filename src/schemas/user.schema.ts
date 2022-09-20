import * as yup from "yup";

export const userSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(4, "Name requires at least 4 characters")
    .max(127, "Name cannot exceed 127 characters"),
  email: yup.string().required("Email is required.").email("Email is invalid."),
  password: yup
    .string()
    .required("Password is required.")
    .min(4, "Password requires at least 4 characters")
    .max(127, "Password cannot exceed 127 characters"),
});
