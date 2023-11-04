
"use client";

import { buscarDadosUsuarios } from '@/app/services/dadosUsuario';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const listaUsuarios = () => {
    const [dadosUsuarios, setDadosUsuarios] = useState([{
        registro: 1,
        nome: 'teste',
        email: 'teste@teste',
        tipo_usuario: 1
    },
    {
        registro: 2,
        nome: 'teste2',
        email: 'teste2@teste',
        tipo_usuario: 0
    }
    ]);

    const handleBuscarDadosUsuarios = async () => {
        const response = await buscarDadosUsuarios();
        if(response.success === true){
            setDadosUsuarios(response.usuarios);
        }else{
            alert(response.message);
        }
    };

    useEffect(() => {
        handleBuscarDadosUsuarios();
    }, []);

    return (
        <div>
          <h1>Listagem de Usuários</h1>
          {dadosUsuarios.map((usuario, index) => (
            <div key={index}>
              <h2><Link href={`/perfil/${usuario.registro}`}>{usuario.nome}</Link></h2>
              <p>E-mail: {usuario.email}</p>
              <p><Link href={`/perfil/${usuario.registro}`}>Registro: {usuario.registro}</Link></p>
              <br/>
            </div>
          ))}
        </div>
      );      
};

export default listaUsuarios;
