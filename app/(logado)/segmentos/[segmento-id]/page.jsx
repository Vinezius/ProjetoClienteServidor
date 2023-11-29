"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { buscarDadosPontos, buscarDadosSegmento, realizarEdicaoSegmento, realizarExclusaoPonto, realizarExclusaoSegmento } from '@/app/services/pontos-segmentos';
import { Field, Form, Formik } from 'formik';
import Link from 'next/link';

const VisualizarPonto = (params) => {
    const [dadosSegmento, setDadosSegmento] = useState({
        nome: '',
        ponto_id: null,
    });
    const [dadosPontos, setDadosPontos] = useState([]);
    const [visualizarSegmento, setvisualizarSegmento] = useState(true);

    const router = useRouter();
    const index = params.params['segmento-id'];
    const tipoUsuario = sessionStorage.getItem('userType');
    
    const handleBuscarDadosSegmento = async () => {
        const response = await buscarDadosSegmento(index);
        if(response.success === true){
            console.log(response);
            setDadosSegmento(response.segmento);
        }else{
            alert(response.message);
        }
    }

    const handleBuscarDadosPontos = async () => {
        const response = await buscarDadosPontos();
        if(response.success === true){
          console.log(response);
            setDadosPontos(response.pontos);
        }else{
            alert(response.message);
        }
    };


    const handleDelete = async () => {

      try {
          const response = await realizarExclusaoSegmento(index);
          if(response.success === true){
              alert('Excluido com sucesso!');
              router.push('/home')
          }else{
              alert(response.message);
          }
      } catch (error) {
          console.error(error);
      }

  }

  const handleSubmit = async (dadosForm) => {
        const { distancia, ponto_inicial, ponto_final, status, direcao } = dadosForm;
        const { 'distancia':distanciaRota, 'ponto_inicial':ponto_inicial_rota, 'ponto_final':ponto_final_rota, 'status':status_rota, 'direcao':direcao_rota} = dadosSegmento;

        const payload = {
            distancia: distanciaRota ? parseFloat(distanciaRota) : parseFloat(distancia),
            ponto_inicial,
            ponto_final,
            status: status_rota ? parseInt(status_rota) : parseInt(status),
            direcao: direcao_rota ? direcao_rota : direcao,
        }

        try {
            const response = await realizarEdicaoSegmento(index, payload);
            if(response.success === true){
                alert('Segmento atualizado com sucesso!');
                router.push('/home')
            }else{
                alert(response.message);
            }
        } catch (error) {
            console.error(error);
        }
  }

    useEffect(() => {
        handleBuscarDadosSegmento();
        handleBuscarDadosPontos();
    }, []);

    return (
        <div className=''>
            <Formik
                initialValues={{
                    ponto_inicial: null,
                    ponto_final: null,
                    status: "",
                    direcao: "",
                    distancia: 0
                }}
                onSubmit={(values) => {
                    handleSubmit(values);
                }}
            >
                {({ handleChange, values }) => (
                    <div className='container-formulario'>
                        <h1 className='titulo'>Visualizar Segmento</h1>
                        <Form className='formulario'>
                            <label className='titulo' htmlFor="nome">Direção:</label>
                            <Field className="input-formulario" disabled={visualizarSegmento} type="text" name="direcao" onChange={handleChange} value={values.direcao ? values.direcao : dadosSegmento.direcao}/>

                            <div className='campo-formulario'>
                                        <label htmlFor="email">Ponto inicial:</label>
                                        <Field name="ponto_inicial" as="select" onChange={handleChange} disabled={visualizarSegmento}>
                                        <option value="" disabled selected hidden>Selecione um ponto</option>
                                            {dadosPontos.map((ponto, index) => (
                                                <option key={index} value={ponto.ponto_id}>{ponto.nome}</option>
                                            ))}
                                        </Field>
                            </div>
                                <div className='campo-formulario'>
                                        <label htmlFor="email">Ponto Final:</label>
                                        <Field name="ponto_final" as="select" onChange={handleChange} disabled={visualizarSegmento}>
                                        <option value="" disabled selected hidden>Selecione um ponto</option>
                                            {dadosPontos.map((ponto, index) => (
                                                <option key={index} value={ponto.ponto_id}>{ponto.nome}</option>
                                            ))}
                                        </Field>
                                </div>

                            <div className='campo-formulario'>
                                    <Field 
                                        type="radio" 
                                        id="ativo" 
                                        disabled={visualizarSegmento && dadosSegmento.status === 0} 
                                        name="status" 
                                        value={0} 
                                        onChange={handleChange} 
                                        checked={dadosSegmento.status===1 || (!visualizarSegmento && dadosSegmento.status !== 1)}
                                    />
                                    <label>Ativo</label>
                                    <Field 
                                        type="radio" 
                                        id="inativo" 
                                        disabled={visualizarSegmento && dadosSegmento.status === 1} 
                                        name="status" 
                                        value={1} 
                                        onChange={handleChange} 
                                        checked={dadosSegmento.status===0 || (!visualizarSegmento && dadosSegmento.status !== 0)}
                                    />
                                    <label>Inativo</label>
                            </div>
                            <div className="container-botoes">
                                {tipoUsuario == 1 && 
                                    <button type="button" className='botao' onClick={()=>setvisualizarSegmento(prev => !prev)}>{visualizarSegmento ? 'Editar segmento' : 'Visualizar segmento'}
                                    </button>}
                                <button type="submit" className='botao'>
                                    <Link href='/home'> Voltar </Link></button>
                                <div className='botoes-salvar-excluir'>
                                    {!visualizarSegmento &&
                                        <button className='botao-salvar' type="submit">Salvar alterações
                                        </button>}
                                    {tipoUsuario == 1 && 
                                        <button type="button" className='botao-excluir' onClick={handleDelete}>Excluir segmento
                                    </button>}
                                </div>
                            </div>          
                        </Form>
                    </div>
                )}
            </Formik>
        </div>
    );
};

export default VisualizarPonto;
