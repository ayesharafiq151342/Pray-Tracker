import * as yup from "yup";

export const loginSchema = yup.object().shape({
  Email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(4, "Password must be at least 4 characters").max(10, "Password cannot exceed 10 characters").required("Password is required"),
});
