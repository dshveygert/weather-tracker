import {CitiesStore} from '../features/CitySearch/store/citiesStore';

export default class RootStore {
    citiesStore: CitiesStore

    constructor() {
        this.citiesStore = new CitiesStore();
    }
}

export const rootStore = new RootStore();
