"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { buscarDadosPonto, realizarEdicaoPonto, realizarExclusaoPonto } from '@/app/services/pontos-segmentos';
import { Field, Form, Formik } from 'formik';
import Link from 'next/link';

const VisualizarPonto = (params) => {
    const [dadosPonto, setDadosPonto] = useState({});
    const [visualizarPonto, setvisualizarPonto] = useState(true);
    const router = useRouter();
    const index = params.params["ponto-id"];
    const tipoUsuario = sessionStorage.getItem('userType');
    
    const handleBuscarDadosPonto = async () => {
        const response = await buscarDadosPonto(index);
        if(response.success === true){
            console.log(response);
            setDadosPonto(response.ponto);
        }else{
            alert(response.message);
        }
    }

    const handleDelete = async () => {

      try {
          const response = await realizarExclusaoPonto(index);
          if(response.success === true){
              alert('Excluido com sucesso!');
              router.push('/segmentos-pontos')
          }else{
              alert(response.message);
          }
      } catch (error) {
          console.error(error);
      }

  }

  const handleSubmit = async (dadosForm) => {
      const { nome} = dadosForm;
      const { 'nome':nomeRota} = dadosPonto;

      const payload = {
          nome: nome ? nome : nomeRota,
      }

      try {
          const response = await realizarEdicaoPonto(index, payload);
          if(response.success === true){
              alert('Ponto atualizado com sucesso!');
              router.push('/home')
          }else{
              alert(response.message);
          }
      } catch (error) {
          console.error(error);
      }
  }

    useEffect(() => {
        handleBuscarDadosPonto()
    }, []);

    return (
      <div className=''>
          <Formik
              initialValues={{
                  nome: '',
                  ponto_id: null,
              }}
              onSubmit={(values) => {
                  handleSubmit(values);
              }}
          >
              {({ handleChange, values }) => (
                  <div className='container-formulario'>
                      <h1 className='titulo'>Visualizar Ponto</h1>
                      <Form className='formulario'>
                          <label className='titulo' htmlFor="nome">Nome do Ponto:</label>
                          <Field className="input-formulario" disabled={visualizarPonto} type="text" name="nome" onChange={handleChange} value={values.nome ? values.nome : dadosPonto.nome}/>
                          <div className="container-botoes">
                              {tipoUsuario == 1 && 
                                  <button type="button" className='botao' onClick={()=>setvisualizarPonto(prev => !prev)}>{visualizarPonto ? 'Editar ponto' : 'Visualizar ponto'}
                                  </button>}
                              <button type="submit" className='botao'>
                                  <Link href='/segmentos-pontos'> Voltar </Link></button>
                              <div className='botoes-salvar-excluir'>
                                  {!visualizarPonto &&
                                      <button className='botao-salvar' type="submit">Salvar alterações
                                      </button>}
                                  {tipoUsuario == 1 && 
                                      <button type="button" className='botao-excluir' onClick={handleDelete}>Excluir ponto
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
