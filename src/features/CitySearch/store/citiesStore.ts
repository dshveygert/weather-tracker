import {action, computed, makeObservable, observable} from 'mobx';
import ApiRequests from '../../../services/apiRequests';
import {City} from '../../../types/sharedTypes';
import {getCityList} from '../api/getCityList';

export class CitiesStore {
    cities = [];

    private searchCityRequest = new ApiRequests<string, City[]>({
        apiFunction: getCityList
    })

    constructor() {
        makeObservable(this, {
            cities: observable,
            searchedCity: computed,
            searchCityLoading: computed,
            searchCity: action
        });
    }

    get searchCityLoading(): boolean {
        return this.searchCityRequest.isLoading;
    }

    get searchedCity(): City[] {
        return this.searchCityRequest.data ?? [];
    }

    searchCity = async (name: string) => {
        return await this.searchCityRequest.send(name);
    }

}
