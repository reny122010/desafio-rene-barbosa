import axios from 'axios';

import config from './config';

export default axios.create({
  baseURL: config.API_URL,
  headers: {
    'x-rapidapi-key': config.API_KEY,
    'x-rapidapi-host': config.HOST,
  },
});