import {action, computed, makeObservable, observable} from 'mobx';
import ApiRequests from '../../../services/apiRequests';
import {City} from '../../../types/sharedTypes';
import {getCityList} from '../api/getCityList';
import {CitiesStorage, CityStorage} from '../../../utils/localStorage';
import {generateCityId} from '../../../utils/cityId';
import {cityStorage} from '../../../utils/localStorage/utils/localStorage';

export class CitiesStore {
    cities: CitiesStorage<CityStorage> = {};
    private citiesLimit = 7;
    private searchCityRequest = new ApiRequests<string, City[]>({
        apiFunction: getCityList
    });

    constructor() {
        makeObservable(this, {
            cities: observable,
            searchedCity: computed,
            searchCityLoading: computed,
            searchCity: action,
            updateCitiesInList: action
        });
    }

    get searchCityLoading(): boolean {
        return this.searchCityRequest.isLoading;
    }

    get searchedCity(): City[] {
        return this.searchCityRequest.data ?? [];
    }

    get isCityListReachedLimit(): boolean {
        return Object.keys(this.cities).length >= this.citiesLimit;
    }

    updateCitiesInList = (data: CitiesStorage<CityStorage>) => {
        this.cities = data;
    }

    searchCity = async (name: string) => {
        return await this.searchCityRequest.send(name);
    }

    addCityToList = (city: City) => {
        if (Object.keys(this.cities).length < this.citiesLimit) {
            const {name, country, lat, lon} = city;
            const id = generateCityId(city);
            const newCity = {cityName: name, country, lat, lon, id};
            this.updateCitiesInList({...this.cities, [id]: newCity});
            cityStorage.addItem(id, newCity)
        }
    }

    removeCityFromList = (cityId: string) => {
        const cities = {...this.cities};
        delete cities[cityId];
        this.updateCitiesInList(cities);
        cityStorage.removeItem(cityId);
    }

    initCitiesFromLocalStorage = () => {
        const cities = cityStorage.getItem();
        this.updateCitiesInList(cities);
    }

}
