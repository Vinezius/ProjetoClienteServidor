import axios from 'axios';

let apiProjeto;

if (typeof window !== 'undefined') {
  const token = localStorage?.getItem('userToken');

  apiProjeto = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
      ...(token && {'Authorization': `Bearer ${token}`}),
      'Content-Type': 'application/json',
    },
    withCredentials: false,
  });
}

export default apiProjeto;