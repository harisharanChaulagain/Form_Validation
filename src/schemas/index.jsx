import * as Yup from "yup";

export const signUpSchema = Yup.object({
  firstname: Yup.string().min(2).max(30).required("Please enter first name"),
  lastname: Yup.string().min(2).max(30).required("Please enter last name"),
  email: Yup.string().email().required("Please enter email"),
  password: Yup.string().min(6).required("Please enter password"),
  confirmpassword: Yup.string()
    .required()
    .oneOf([Yup.ref('password'), null], "Password must match"),
})

