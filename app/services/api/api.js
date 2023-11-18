import axios from 'axios';

let apiProjeto;
const ip = sessionStorage.getItem('ip');
const porta = sessionStorage.getItem('porta');

if (typeof window !== 'undefined') {
  const token = sessionStorage?.getItem('userToken');

  apiProjeto = axios.create({
    baseURL: `http://${ip}:${porta}`,
    headers: {
      ...(token && {'Authorization': `Bearer ${token}`}),
      'Content-Type': 'application/json',
    },
    withCredentials: false,
  });
}

export default apiProjeto;