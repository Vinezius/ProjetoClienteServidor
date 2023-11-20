"use client";

import { buscarDadosPontos, buscarDadosSegmentos } from "@/app/services/pontos-segmentos";
import Link from "next/link";
import { useEffect, useState } from "react";

const ListarSegmentos = () => {
    const [dadosSegmentos, setDadosSegmentos] = useState([]);

    const handleBuscarDadosSegmentos = async () => {
        const response = await buscarDadosSegmentos();
        if(response.success === true){
          console.log(response);
          setDadosSegmentos(response.segmentos);
        }else{
            alert(response.message);
        }
    };

    useEffect(() => {
        handleBuscarDadosSegmentos();
    }, []);

  return (
    <div>
        <h1>Listagem de Segmentos</h1>
        {dadosSegmentos?.map((segmento, index) => (
        <div key={index}>
            <h3><Link href={`/segmentos/${segmento.segmento_id}`}> Partindo de: {segmento.ponto_inicial}</Link></h3>
            <h3><Link href={`/segmentos/${segmento.segmento_id}`}> Terminando em: {segmento.ponto_final}</Link></h3>
            <label>---------------------------------------------------</label>
            <br/>
        </div>
        ))}
  </div>
  );
};

export default ListarSegmentos;
