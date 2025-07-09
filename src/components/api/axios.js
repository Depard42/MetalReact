import axios from 'axios';

import { ApiUrl } from '../../constants';
import { getCredsTelegram } from '../../telegram';

const myAxios = axios.create({
  baseURL: ApiUrl,
});

const auth_data = getCredsTelegram();

// Добавляем интерцептор для всех запросов
myAxios.interceptors.request.use(
  (config) => {
    config.headers['X-TELEGRAM-HASH'] = auth_data.hash;
    config.headers['X-TELEGRAM-CHECKDATA'] = auth_data.checkDataString;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default myAxios;