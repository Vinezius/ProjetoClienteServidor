"use client";

import { realizarLogout } from '@/app/services/login-cadastro-logout';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Home = (props) => {
    const tipo_usuario = localStorage.getItem('userType');
    const router = useRouter();

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
            <button onClick={handleLogout}>Logout</button>
            {tipo_usuario == 1 && 
                <button>
                    <Link href="/cadastro" className='botao-redirect'>Fazer Cadastro</Link>
                </button>
            }
        </div>
    );
}

export default Home;
