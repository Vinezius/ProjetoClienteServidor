import apiProjeto from "../api/api";

export async function realizarLogin(dadosLogin){
    try {
        const response = await apiProjeto.post('/login', dadosLogin);
        return(response.data);
    } catch (error) {
        console.error(error);
    }

}

export async function realizarCadastro(dadosCadastro){
    try {
        const response = await apiProjeto.post('/usuarios', dadosCadastro);
        return(response.data);
    } catch (error) {
        console.error(error);
    }
}