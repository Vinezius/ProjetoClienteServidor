import axios from 'axios';

const token = localStorage?.getItem('userToken');

const apiProjeto = axios.create({

  baseURL: 'http://localhost:3333',
  headers: {
    ...(token && {'Authorization': `Bearer ${token}`}),
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

export default apiProjeto;
