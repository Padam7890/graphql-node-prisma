import * as Yup from "yup";

export const createUserValidate = Yup.object().shape({
  title: Yup.string().required("title is required"),
  content: Yup.string().required("content is required"),
});

export const updateUserValidate = createUserValidate;