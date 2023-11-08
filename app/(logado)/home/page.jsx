"use client";

import { buscarDadosUsuario } from '@/app/services/dadosUsuario';
import { realizarLogout } from '@/app/services/login-cadastro-logout';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Home = (props) => {

    const registro = localStorage.getItem('registro');
    const [tipoUsuario, setTipoUsuario] = useState();
    const router = useRouter();

    const handleBuscarDadosUsuario = async () => {
        const response = await buscarDadosUsuario(registro);
        if(response.success === true){
            setTipoUsuario(response.usuario.tipo_usuario);
            localStorage.setItem('userType', response.usuario.tipo_usuario);
        }else{
            alert(response.message);
        }
    }

    useEffect(() => {
        if (localStorage.getItem('userToken') === null) {
            router.push('/login');
        }
        handleBuscarDadosUsuario();
    }, []);

    const handleLogout = async () => {
        try {
            const response = await realizarLogout();
            if (response.success === true) {
                alert("Logout realizado com sucesso!");
                localStorage.clear();
                router.push('/login');
            } else {
                alert(response.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
<div>
                <h1>Home</h1>
                <div className='container-home'>
                    <button onClick={handleLogout} className='botao-home'>Logout</button>
                    {tipoUsuario == 1 &&
                        <button className='botao-home'>
                            <Link href="/cadastro">Cadastrar Usuário</Link>
                        </button>
                    }
                    <button className='botao-home'>
                        <Link href="/perfil">Meu perfil</Link>
                    </button>
                    <button className='botao-home'>
                        <Link href="/listar-usuarios">Listar usuários</Link>
                    </button>
                </div>
            </div>
        </>
    );
}

export default Home;
