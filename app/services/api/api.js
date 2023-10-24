import axios from 'axios';

const token = process.env.TOKEN_PROJETO;

const apiProjeto = axios.create({

  baseURL: 'http://localhost:3333',
  headers: {
    'Authorization': `${token}`,
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  withCredentials: true,
  crossdomain: true,
});

export default apiProjeto;
