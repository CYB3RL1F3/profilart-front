import axios from 'axios';

export const client = axios.create({
  baseURL: 'https://profilart.fr',
  responseType: 'json'
});