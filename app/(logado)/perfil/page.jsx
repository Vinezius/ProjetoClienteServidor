"use client";

import { buscarDadosUsuario, realizarEdicaoUsuario, realizarExclusaoUsuario } from '@/app/services/dadosUsuario';
import React, { useEffect, useState } from 'react';

import { Formik, Form, Field } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import md5 from 'md5';

const perfil = () => {
    const [dadosUsuario, setDadosUsuario] = useState({
        nome: '',
        registro: '',
        senha: '',
        email: ''
    });
    const [visualizarPerfil, setvisualizarPerfil] = useState(true);
    const router = useRouter();
    const registro = sessionStorage.getItem('registro');

    const handleBuscarDadosUsuario = async () => {
        const response = await buscarDadosUsuario(registro);
        if(response.success === true){
            setDadosUsuario(response.usuario);
        }else{
            alert(response.message);
        }
    }

    useEffect(() => {
        handleBuscarDadosUsuario()
    }, []);

    const handleDelete = async () => {
        try {
            const response = await realizarExclusaoUsuario(registro, senhaCripto);
            if(response.success === true){
                alert('Excluido com sucesso!');
                router.push('/login')
            }else{
                alert(response.message);
            }
        } catch (error) {
            console.error(error);
        }

    }

    const handleSubmit = async (dadosForm) => {
        const { nome, senha, email } = dadosForm;
        const { 'nome':nomeRota, 'senha':senhaRota, 'email':emailRota} = dadosUsuario;

        const payload = {
            nome: nome ? nome : nomeRota,
            senha: senha ? md5(senha) : senhaRota,
            email: email ? email : emailRota,
        }

        try {
            const response = await realizarEdicaoUsuario(registro, payload);
            if(response.success === true){
                alert('Perfil atualizado com sucesso!');
                router.push('/login')
            }else{
                alert(response.message);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className=''>
            <Formik
                initialValues={{
                    nome: '',
                    registro: '',
                    senha: '',
                    email: '',
                    tipo_usuario: 0
                }}
                onSubmit={(values) => {
                    handleSubmit(values);
                }}
            >
                {({ handleChange, values }) => (
                    <div className='container-formulario'>
                        <h1 className='titulo'>Meu perfil</h1>
                        <Form className='formulario'>
                            <label className='titulo' htmlFor="nome">Nome:</label>
                            <Field className="input-formulario" disabled={visualizarPerfil} type="text" name="nome" onChange={handleChange} value={values.nome ? values.nome : dadosUsuario.nome}/>

                            <label className='titulo' htmlFor="senha">Senha:</label>
                            <Field className="input-formulario" disabled={visualizarPerfil} type="password" name="senha" onChange={handleChange} value={values.senha ? values.senha : dadosUsuario.senha}/>

                            <label className='titulo' htmlFor="email">Email:</label>
                            <Field className="input-formulario" disabled={visualizarPerfil} type="email" name="email" onChange={handleChange} value={values.email ? values.email : dadosUsuario.email}/>
                            <div className='campo-formulario'>
                                    <Field 
                                        type="radio" 
                                        id="usuarioComum" 
                                        disabled
                                        name="tipo_usuario" 
                                        value={0} 
                                        onChange={handleChange} 
                                        checked={dadosUsuario.tipo_usuario===0 || (!visualizarPerfil && dadosUsuario.tipo_usuario !== 0)}
                                    />
                                    <label>Usuário Comum</label>
                                    <Field 
                                        type="radio" 
                                        id="usuarioAdm" 
                                        disabled
                                        name="tipo_usuario" 
                                        value={1} 
                                        onChange={handleChange} 
                                        checked={dadosUsuario.tipo_usuario===1 || (!visualizarPerfil && dadosUsuario.tipo_usuario !== 1)}
                                    />
                                    <label>Usuário Administrador</label>
                            </div>
                            <div className="container-botoes">
                                <button type="button" className='botao' onClick={()=>setvisualizarPerfil(prev => !prev)}>{visualizarPerfil ? 'Editar perfil' : 'Visualizar perfil'}</button>
                                <button type="submit" className='botao'>
                                    <Link href='/home'> Voltar </Link></button>
                                <div className='botoes-salvar-excluir'>
                                    {!visualizarPerfil && 
                                        <button className='botao-salvar' type="submit">Salvar alterações
                                        </button>}
                                    <button type="button" className='botao-excluir' onClick={handleDelete}>Excluir perfil</button>
                                </div>
                            </div>          
                        </Form>
                    </div>
                )}
            </Formik>
        </div>
    );
}

export default perfil;