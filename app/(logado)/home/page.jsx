"use client";

import { realizarLogout } from '@/app/services/login-cadastro-logout';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Home = (props) => {
    
    const tipo_usuario = localStorage.getItem('userType');
    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem('userToken') === null) {
            router.push('/login');
        }
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
        <div>
            <h1>Home</h1>
            <div className='container-home'>
                <button onClick={handleLogout} className='botao-home'>Logout</button>
                {tipo_usuario == 1 && 
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
    );
}

export default Home;
