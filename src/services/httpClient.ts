import axios from 'axios';
import appConfig from '../consts/appConfig';

export const publicHttp = axios.create({
  baseURL: appConfig.api.weatherUrl
});
