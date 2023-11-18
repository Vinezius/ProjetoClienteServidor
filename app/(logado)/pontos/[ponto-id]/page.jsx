"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { buscarDadosPonto, realizarEdicaoPonto, realizarExclusaoPonto } from '@/app/services/pontos-segmentos';
import { Field, Form, Formik } from 'formik';
import Link from 'next/link';

const VisualizarPonto = (params) => {
    const [dadosPonto, setDadosPonto] = useState({
        nome: '',
        ponto_id: null,
    });
    const [visualizarPonto, setvisualizarPonto] = useState(true);

    const router = useRouter();
    const index = params.params.index;
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
      const senha = prompt('Tem certeza que deseja excluir esse Ponto?');
      const senhaCripto = md5(senha);

      try {
          const response = await realizarExclusaoPonto(registro, senhaCripto);
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
      const { nome} = dadosForm;
      const { 'nome':nomeRota} = dadosPonto;

      const payload = {
          nome: nomeRota ? nomeRota : nome,
      }

      try {
          const response = await realizarEdicaoPonto(registro, payload);
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
