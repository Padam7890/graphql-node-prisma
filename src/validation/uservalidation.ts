import * as Yup from "yup";

export const createUserSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const updateUserSchema = createUserSchema.shape({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .notRequired(),
});

export const loginUserSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const signupUserSchema = createUserSchema;


