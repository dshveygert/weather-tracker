import {publicHttp, weatherApiKey} from "../../../services/httpClient";
import {queryParamsSerializer} from "../../../utils/queryParamsSerializer";
import {WeatherByCoordinatesRequest} from "../types";

const apiUrl: string = `/data/2.5/weather`;
export const getWeatherByCoordinates = (params: WeatherByCoordinatesRequest) => {
    const url = `${apiUrl}`;
    return publicHttp.get(url, {
        params: {...params, appid: weatherApiKey},
        paramsSerializer: {
            serialize: queryParamsSerializer,
            indexes: false
        }
    });
};
