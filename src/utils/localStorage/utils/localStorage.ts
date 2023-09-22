import {CitiesStorage, CitySettings, CityStorage} from "../types";

const citiesToken = 'cities';
const citiesSettingsToken = 'settings';

type LocalStorageConstructor = {
    token: string;
}

class LocalStorage<DataType, ItemType> {
    token: string;

    constructor({token}: LocalStorageConstructor) {
        this.token = token;
    };

    private setStorageItem = (data: string): void => {
        localStorage.setItem(this.token, data);
    };

    private getStorageItem = (): DataType => {
        const storageData = localStorage.getItem(this.token) ?? '';
        return !!storageData ? JSON.parse(storageData) : {};
    }

    addItem = (id: string, item: ItemType) => {
        const existItems = this.getStorageItem();
        // @ts-ignore
        existItems[id] = item;
        this.setStorageItem(JSON.stringify(existItems));
    }

}

export const cityStorage = new LocalStorage<CitiesStorage<CityStorage>, CityStorage>({token: citiesToken});
export const citySettingsStorage = new LocalStorage<CitiesStorage<CitySettings>, CitySettings>({token: citiesSettingsToken});
