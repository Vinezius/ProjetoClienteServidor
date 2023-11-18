export async function cadastrarPonto(payload){
    try {
        const response = await apiProjeto.post('/pontos', payload);
        return(response.data);
    } catch (error) {
        return({ message: "Erro ao cadastrar ponto",
        success: false});
    }
}

export async function buscarDadosPontos(){
    try {
        const response = await apiProjeto.get('/pontos');
        return(response.data);
    } catch (error) {
        return({ message: "Erro ao buscar pontos",
        success: false});
    }
}

export async function buscarDadosPonto(index){
    try {
        const response = await apiProjeto.get(`{/pontos/${index}`);
        return(response.data);
    } catch (error) {
        return({ message: "Erro ao buscar ponto",
        success: false});
    }
}

export async function realizarExclusaoPonto(index){
    try {
        const response = await apiProjeto.delete(`{/pontos/${index}`);
        return(response.data);
    } catch (error) {
        return({ message: "Erro ao excluir ponto",
        success: false});
    }
}