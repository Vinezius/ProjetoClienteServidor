"use client";

import React from 'react';
import { Formik, Form, Field } from 'formik';
import apiProjeto  from '../../services/api/api';
import { validacoesYup } from '../yupValidations';
import Link from 'next/link';
import { realizarLogin } from '@/app/services/login-cadastro';
        
async function handleSubmit(dadosForm) {
    try {
        const response = await realizarLogin(dadosForm);
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

function LoginPage() {
    return (
        <Formik
            initialValues={{ registro: '', senha: '' }}
            onSubmit={(values) => {handleSubmit(values)}}
        >
            {({ handleChange, handleSubmit }) => (
                <div className='container-formulario'>
                    <Form className='formulario'>
                        <h1 className='titulo'>Fazer login</h1>
                        <div className='campo-formulario'> 
                            <label htmlFor="registro">RA</label>
                            <Field id="registro" name="registro" onChange={handleChange} className="input-formulario"/>
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
