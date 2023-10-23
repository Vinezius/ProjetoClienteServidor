import * as Yup from "yup";


export const validacoesYup = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
        .required("Required")
        .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password"), null], "As senhas devem ser iguais"),
});