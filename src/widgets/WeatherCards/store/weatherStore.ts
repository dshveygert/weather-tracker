import {action, computed, makeObservable, observable} from 'mobx';
import ApiRequests from '../../../services/apiRequests';
import {CitiesStorage, CityStorage} from "../../../utils/localStorage";
import {Weather, WeatherByCoordinatesRequest, WeatherByCoordinatesResponse, WeatherStorage} from "../types";
import {getWeatherByCoordinates} from '../api/getWeather';
import {TemperatureUnit} from "../../../types/sharedTypes";

export class WeatherStore {
    weather: WeatherStorage<Weather> = {};
    private getWeatherByCoordinatesRequest = new ApiRequests<WeatherByCoordinatesRequest, WeatherByCoordinatesResponse>({
        apiFunction: getWeatherByCoordinates
    })

    constructor() {
        makeObservable(this, {
            weather: observable,
            weatherLoading: computed,
            requestWeatherForCityList: action
        });
    }

    get weatherLoading(): boolean {
        return this.getWeatherByCoordinatesRequest.isLoading;
    }

    requestWeatherForCityList = async (data: CitiesStorage<CityStorage>) => {
        const weather: WeatherStorage<Weather> = {};
        const cities = data && Object.keys(data)
            .filter(key => {
                return Object.keys(this.weather).findIndex(cityId => cityId === key) < 0;
            })
            .map(key => {
                const {id, lat, lon} = data[key];
                return {id, lat, lon};
            });

        for (let i = 0; i < cities?.length; i++) {
            const {id, lat, lon} = cities[i];
            const result = await this.getWeatherByCoordinates({lat, lon, units: TemperatureUnit.Celsius}); // ToDo use real units
            if (result) {
                weather[id] = {cityId: id, ...result};
            }
            this.weather = {...this.weather, ...weather};
        }
    }

    private getWeatherByCoordinates = async (coordinates: WeatherByCoordinatesRequest) => {
        await this.getWeatherByCoordinatesRequest.send(coordinates);
        return this.getWeatherByCoordinatesRequest.data ?? {} as WeatherByCoordinatesResponse;
    };
}
