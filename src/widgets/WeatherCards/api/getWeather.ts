import {publicHttp, weatherApiKey} from "../../../services/httpClient";
import {queryParamsSerializer} from "../../../utils/queryParamsSerializer";
import ApiRequests from "../../../services/apiRequests";
import {WeatherByCoordinatesRequest, WeatherByCoordinatesResponse} from "../types";

const apiUrl = `/data/2.5/weather`;
const getWeatherByCoordinates = (params: WeatherByCoordinatesRequest) => {
    const url = `${apiUrl}`;
    return publicHttp.get(url, {
        params: {...params, appid: weatherApiKey},
        paramsSerializer: {
            serialize: queryParamsSerializer,
            indexes: false
        }
    });
};

export const getWeatherByCoordinatesRequest = new ApiRequests<WeatherByCoordinatesRequest, WeatherByCoordinatesResponse>({
    apiFunction: getWeatherByCoordinates
})
