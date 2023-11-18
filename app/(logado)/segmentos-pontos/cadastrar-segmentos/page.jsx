"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import { realizarCadastro } from "@/app/services/login-cadastro-logout";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { buscarDadosPontos, cadastrarSegmento } from "@/app/services/pontos-segmentos";
        
const RegistrationPage = (props) => {
    const router = useRouter();
    const [dadosPontos, setDadosPontos] = useState([
        {
            nome: "Primeiro ponto",
            ponto_id: 0,
        },
        {
            nome: "Segundo ponto",
            ponto_id: 1,
        }
        ]);

    const handleSubmit = async (dadosForm) => {
        const { distancia, ponto_inicial, ponto_final, status, direcao } = dadosForm;
        const payload = {
            ponto_inicial,
            ponto_final,
            status: parseInt(status),
            direcao,
            distancia: parseInt(distancia)
        }

        try {
            const response = await cadastrarSegmento(payload);
            console.log(response);
            if(response.success){
                alert('Segmento cadastrado com sucesso!');
                router.push('/segmentos-pontos')
            }else{
                alert(response.message);
            }

        } catch (error) {
            console.error(error);
        }
    };
    
    const handleBuscarDadosPontos = async () => {
        const response = await buscarDadosPontos();
        if(response.success === true){
          console.log(response);
            setDadosPontos(response.pontos);
        }else{
            alert(response.message);
        }
    };

    useEffect(() => {
        handleBuscarDadosPontos();
    }, []);

    return(
        <>
            <div>
                <Formik
                    initialValues={{
                        ponto_inicial: null,
                        ponto_final: null,
                        status: "",
                        direcao: "",
                        distancia: 0
                    }}
                    onSubmit={(values) => {handleSubmit(values)}}
                >
                    {({ handleChange }) => (
                        <div className='container-formulario'>
                            <Form className='formulario'>
                                <h1 className="titulo">Cadastrar segmento</h1>
                                <div className='campo-formulario'>
                                    <label htmlFor="name">Direção</label>
                                    <Field name="direcao" onChange={handleChange} className="input-formulario"/>
                                </div>

                                <div className='campo-formulario'>
                                        <label htmlFor="email">Ponto inicial:</label>
                                        <Field name="ponto_inicial" as="select" onChange={handleChange}>
                                        <option value="" disabled selected hidden>Selecione um ponto</option>
                                            {dadosPontos.map((ponto, index) => (
                                                <option key={index} value={ponto.ponto_id}>{ponto.nome}</option>
                                            ))}
                                        </Field>
                                </div>
                                <div className='campo-formulario'>
                                        <label htmlFor="email">Ponto Final:</label>
                                        <Field name="ponto_final" as="select" onChange={handleChange}>
                                        <option value="" disabled selected hidden>Selecione um ponto</option>
                                            {dadosPontos.map((ponto, index) => (
                                                <option key={index} value={ponto.ponto_id}>{ponto.nome}</option>
                                            ))}
                                        </Field>
                                </div>
                                <div className='campo-formulario'>
                                    <label htmlFor="registro">Distancia</label>
                                    <Field name="distancia" onChange={handleChange} className="input-formulario" type="number"/>
                                </div>
                                <div className='campo-formulario'>
                                        <Field type="radio" id="Ativo" name="status" value="1" onChange={handleChange}/>
                                        <label>Ativo</label>
                                        <Field type="radio" id="Desativado" name="status" value="0" onChange={handleChange}/>
                                        <label>Desativado</label>
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
