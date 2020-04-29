import axios from 'axios';
import { BASE_URL } from 'constants/api';

export const client = axios.create({
  baseURL: BASE_URL,
  responseType: 'json'
});