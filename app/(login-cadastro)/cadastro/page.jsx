"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import { realizarCadastro } from "@/app/services/login-cadastro-logout";
import { useRouter } from "next/navigation";

const RegistrationPage = (props) => {
    const router = useRouter();

    const handleSubmit = async (dadosForm) => {
        const { nome, email, senha, registro } = dadosForm;

        const payload = {
            nome,
            email,
            senha,
            tipo_usuario: 0,
            registro
        }

        try {
            const response = await realizarCadastro(payload);
            console.log(response);
            if(response.success){
                alert('Cadastro realizado com sucesso!');
                router.push('/home')
            }else{
                alert(response.message);
            }

        } catch (error) {
            console.error(error);
        }
    };

    return(
        <>
            <div>
                <Formik
                    initialValues={{
                        nome: "",
                        email: "",
                        senha: "",
                        registro: "",
                    }}
                    onSubmit={(values) => {handleSubmit(values)}}
                >
                    {({ handleChange }) => (
                        <div className='container-formulario'>
                            <Form className='formulario'>
                                <h1 className="titulo">Fazer cadastro</h1>
                                <div className='campo-formulario'>
                                    <label htmlFor="name">Name</label>
                                    <Field name="nome" onChange={handleChange} className="input-formulario"/>
                                    <ErrorMessage name="nome" />
                                </div>

                                <div className='campo-formulario'>
                                    <label htmlFor="email">Email</label>
                                    <Field name="email" type="email" onChange={handleChange} className="input-formulario"/>
                                    <ErrorMessage name="email" />
                                </div>

                                <div className='campo-formulario'>
                                    <label htmlFor="password">Senha</label>
                                    <Field name="senha" type="password" onChange={handleChange} className="input-formulario"/>
                                    <ErrorMessage name="senha" />
                                </div>

                                <div className='campo-formulario'>
                                    <label htmlFor="registro">RA</label>
                                    <Field name="registro" onChange={handleChange} className="input-formulario"/>
                                    <ErrorMessage name="registro" />
                                </div>
                                <div className='container-botoes'>
                                    <button><Link href="/home" className='botao-redirect'>Voltar</Link></button>
                                    <button type="submit" className="botao-sucesso">Enviar</button>
                                </div>
                            </Form>
                        </div>
                    )}
                </Formik>
            </div>
        </>
    )
};

export default RegistrationPage;
