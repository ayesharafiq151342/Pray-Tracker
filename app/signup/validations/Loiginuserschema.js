import * as yup from "yup";

export const Userschema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup
    .string()
    .min(4, "Password must be at least 4 characters")
    .max(10, "Password must be at most 10 characters")
    .required("Password is required"),
});
