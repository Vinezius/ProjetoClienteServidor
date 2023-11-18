"use client";

import { buscarDadosPontos } from "@/app/services/pontos-segmentos";
import Link from "next/link";
import { useEffect, useState } from "react";

const ListarSegmentos = () => {
    const [dadosSegmentos, setDadosSegmentos] = useState([
    {
        ponto_inicial: "Primeiro ponto",
        ponto_final: "Segundo ponto",
        status: 1,
        distancia: 0,
        direção: "esquerda",
        segmento_id: 0,
    },
    {
        ponto_inicial: "Terceiro ponto",
        ponto_final: "Quarto ponto",
        status: 1,
        distancia: 0,
        direção: "direita",
        segmento_id: 0,
    },
    ]);

    const handleBuscarDadosSegmentos = async () => {
        const response = await buscarDadosSegmentos();
        if(response.success === true){
          console.log(response);
            setDadosSegmentos(response.pontos);
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
        {dadosSegmentos.map((segmento, index) => (
        <div key={index}>
            <h3><Link href={`/pontos/${segmento.segmento_id}`}> Partindo de: {segmento.ponto_inicial}</Link></h3>
            <h3><Link href={`/pontos/${segmento.segmento_id}`}> Terminando em: {segmento.ponto_final}</Link></h3>
            <label>---------------------------------------------------</label>
            <br/>
        </div>
        ))}
  </div>
  );
};

export default ListarSegmentos;
