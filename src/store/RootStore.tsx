import {CitiesStore} from '../features/CitySearch/store/citiesStore';
import {WeatherStore} from '../widgets/WeatherCards/store/weatherStore';

export default class RootStore {
    citiesStore: CitiesStore;
    weatherStore: WeatherStore;

    constructor() {
        this.citiesStore = new CitiesStore();
        this.weatherStore = new WeatherStore();
    }
}

export const rootStore = new RootStore();
