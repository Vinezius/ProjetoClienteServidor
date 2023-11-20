import apiProjeto from "../api/api";

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

export async function buscarDadosPonto(id){
    try {
        const response = await apiProjeto.get(`/pontos/${id}`);
        return(response.data);
    } catch (error) {
        return({ message: "Erro ao buscar ponto",
        success: false});
    }
}

export async function realizarExclusaoPonto(id){
    try {
        const response = await apiProjeto.delete(`/pontos/${id}`);
        return(response.data);
    } catch (error) {
        return({ message: "Erro ao excluir ponto",
        success: false});
    }
}

export async function realizarEdicaoPonto(id, payload){
    try {
        const response = await apiProjeto.put(`/pontos/${id}`, payload);
        return(response.data);
    } catch (error) {
        console.log(error);
        return({ message: "Erro ao editar ponto",
        success: false});
    }
}

export async function buscarDadosSegmentos(){
    try {
        const response = await apiProjeto.get('/segmentos');
        return(response.data);
    } catch (error) {
        return({ message: "Erro ao buscar Segmentos",
        success: false});
    }
}

export async function buscarDadosSegmento(id){
    try {
        const response = await apiProjeto.get(`/segmentos/${id}`);
        return(response.data);
    } catch (error) {
        return({ message: "Erro ao buscar ponto",
        success: false});
    }
}

export async function realizarExclusaoSegmento(id){
    try {
        const response = await apiProjeto.delete(`/segmentos/${id}`);
        return(response.data);
    } catch (error) {
        return({ message: "Erro ao excluir ponto",
        success: false});
    }
}

export async function realizarEdicaoSegmento(id, payload){
    try {
        const response = await apiProjeto.put(`/segmentos/${id}`, payload);
        return(response.data);
    } catch (error) {
        return({ message: "Erro ao editar ponto",
        success: false});
    }
}

export async function cadastrarSegmento(payload){
    try {
        const response = await apiProjeto.post('/segmentos', payload);
        return(response.data);
    } catch (error) {
        return({ message: "Erro ao cadastrar ponto",
        success: false});
    }
}