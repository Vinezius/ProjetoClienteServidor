"use client";

import React from 'react';
import { Formik, Form, Field } from 'formik';
import apiProjeto  from '../../services/api/api';
import { validacoesYup } from '../yupValidations';
import Link from 'next/link';
        
async function handleSubmit(dadosForm) {
    try {
        const response = await apiProjeto.post('/login', dadosForm);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

function LoginPage() {
    return (
        <Formik
            initialValues={{ email: '', senha: '' }}
            onSubmit={(values) => {handleSubmit(values)}}
        >
            {({ handleChange, handleSubmit }) => (
                <div className='container-formulario'>
                    <Form className='formulario'>
                        <h1 className='titulo'>Fazer login</h1>
                        <div className='campo-formulario'> 
                            <label htmlFor="email">E-mail</label>
                            <Field id="email" name="email" type="email" onChange={handleChange} className="input-formulario"/>
                        </div>
                        <div className='campo-formulario'> 
                            <label htmlFor="senha">Senha</label>
                            <Field id="senha" name="senha" type="password" onChange={handleChange} className="input-formulario"/>
                        </div>
                        <div className='container-botoes'>
                            <button><Link href="/cadastro" className='botao-redirect'>Fazer Cadastro</Link></button>
                            <button type="submit" className='botao-sucesso'>Entrar</button>
                        </div>
                    </Form>
                </div>
            )}
        </Formik>
    );
}

export default LoginPage;
