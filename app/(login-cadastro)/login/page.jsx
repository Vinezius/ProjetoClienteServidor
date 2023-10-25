"use client";

import { Formik, Form, Field } from 'formik';
import Link from 'next/link';
import { realizarLogin } from '@/app/services/login-cadastro-logout';
import { useRouter } from 'next/navigation';
        
const LoginPage = () => {
    const router = useRouter();

    async function handleSubmit(dadosForm) {
        try {
            const response = await realizarLogin(dadosForm);
            if(response.success === true){
                localStorage.setItem('userToken', response.token);
                localStorage.setItem('userType', response.tipo_usuario)
                alert('Login realizado com sucesso!');
                router.push('/home')
            }else{
                alert(response.message);
            }
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <Formik
            initialValues={{ registro: '', senha: '' }}
            onSubmit={(values) => {handleSubmit(values)}}
        >
            {({ handleChange, handleSubmit }) => (
                <div className='container-formulario'>
                    <Form className='formulario'>
                        <h1 className='titulo'>Fazer login</h1>
                        <div className='campo-formulario'> 
                            <label htmlFor="registro">RA</label>
                            <Field id="registro" name="registro" onChange={handleChange} className="input-formulario"/>
                        </div>
                        <div className='campo-formulario'> 
                            <label htmlFor="senha">Senha</label>
                            <Field id="senha" name="senha" type="password" onChange={handleChange} className="input-formulario"/>
                        </div>
                        <div className='container-botoes'>
                            <button type="submit" className='botao-sucesso'>Entrar</button>
                        </div>
                    </Form>
                </div>
            )}
        </Formik>
    );
}

export default LoginPage;
