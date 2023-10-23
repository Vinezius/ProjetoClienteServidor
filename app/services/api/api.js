import axios from 'axios';

const apiProjeto = axios.create({
  baseURL: 'http://localhost:3333',
  timeout: 5000, 
  // headers: {
  //   'Authorization': 'AUTH_TOKEN',
  //   'Content-Type': 'application/json'
  // }
});

export default apiProjeto;
