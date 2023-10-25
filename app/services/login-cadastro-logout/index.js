import apiProjeto from "../api/api";

export async function realizarLogin(dadosLogin){
    try {
        const response = await apiProjeto.post('/login', dadosLogin);
        return(response.data);
    } catch (error) {
        return({ message: "Erro ao fazer login",
                success: false});
    }

}

export async function realizarCadastro(dadosCadastro){
    try {
        const response = await apiProjeto.post('/usuarios', dadosCadastro);
        return(response.data);
    } catch (error) {
        return({ message: "Erro ao cadastrar",
        success: false});
    }
}

export async function realizarLogout(){
    try {
        const response = await apiProjeto.post('/logout');
        return(response.data);
    } catch (error) {
        return({ message: "Erro ao fazer logout",
        success: false});
    }
}