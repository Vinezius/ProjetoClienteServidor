"use client";

import { cadastrarPonto } from "@/app/services/pontos-segmentos";
import Link from "next/link";

const SegmentosPontosPage = () => {

  const handleCadastrarPonto = async () => {
    let nome = "";
    while (nome === ""){
      nome = prompt('Insira o nome do ponto que deseja cadastrar');
    }

    const payload = {
      nome
    }

    try {
      const response = await cadastrarPonto(payload);
      if (response.success === true) {
          alert("Ponto cadastrado com sucesso!");
      } else {
          alert(response.message);
      }
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <>
        <h1>Pontos e Segmentos</h1>
        <div className='container-home'>
          <button className='botao-home' onClick={handleCadastrarPonto}>Cadastrar Ponto</button>
          <button className='botao-home'>
              <Link href="segmentos-pontos/listar-pontos">Listar Pontos</Link>
          </button>
          <button className='botao-home'>
              <Link href="segmentos-pontos/cadastrar-segmentos">Cadastrar Segmentos</Link>
          </button>
          <button className='botao-home'>
              <Link href="segmentos-pontos/listar-segmentos">Listar Segmentos</Link>
          </button>
        </div>
    </>
  );
};

export default SegmentosPontosPage;
