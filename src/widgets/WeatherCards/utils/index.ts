import {WeatherByCoordinatesRequest, WeatherByCoordinatesResponse} from "../types";
import {getWeatherByCoordinatesRequest} from "../api/getWeather";

const getWeather = async (coordinates: WeatherByCoordinatesRequest) => {
    await getWeatherByCoordinatesRequest.send(coordinates);
    return getWeatherByCoordinatesRequest.data ?? {} as WeatherByCoordinatesResponse;
};

export const getWeatherList = async (coordinates: WeatherByCoordinatesRequest[]) => {
    for (let i = 0; i < coordinates?.length; i++) {
        await getWeather(coordinates[i]);
    }
}
