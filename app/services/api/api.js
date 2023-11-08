import axios from 'axios';

let apiProjeto;
const ip = localStorage.getItem('ip');
const porta = localStorage.getItem('porta');

if (typeof window !== 'undefined') {
  const token = localStorage?.getItem('userToken');

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