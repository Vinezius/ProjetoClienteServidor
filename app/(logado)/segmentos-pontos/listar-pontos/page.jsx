"use client";

import { buscarDadosPontos } from "@/app/services/pontos-segmentos";
import Link from "next/link";
import { useEffect, useState } from "react";

const ListarPontos = () => {
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

  return (
    <div>
        <h1>Listagem de Pontos</h1>
        {dadosPontos.map((ponto, index) => (
        <div key={index}>
            <h2><Link href={`/pontos/${ponto.ponto_id}`}>{ponto.nome}</Link></h2>
            <br/>
        </div>
        ))}
  </div>
  );
};

export default ListarPontos;
