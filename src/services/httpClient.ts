import axios from 'axios';
import appConfig from '../consts/appConfig';

export const weatherApiKey = appConfig.publicApi.weatherKey;
export const publicHttp = axios.create({
  baseURL: appConfig.publicApi.weatherUrl,
  withCredentials: false
});
