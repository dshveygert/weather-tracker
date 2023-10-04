import {CitiesStorage, CitySettings, CityStorage} from "../types";

const languageToken = 'lng';
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

    addItem = (id: string, item: ItemType) => {
        const existItems = this.getStorageItem();
        // @ts-ignore
        existItems[id] = item;
        this.setStorageItem(JSON.stringify(existItems));
    }

    getItem = (): DataType => {
        return this.getStorageItem();
    }

    removeItem = (id: string) => {
        const existItems = this.getStorageItem();
        if (!!existItems && typeof existItems === 'object' && existItems.hasOwnProperty(id)) {
            // @ts-ignore TODO Fix it
            delete existItems[id];
            this.setStorageItem(JSON.stringify(existItems));
        }
    }

    private setStorageItem = (data: string): void => {
        localStorage.setItem(this.token, data);
    };

    private getStorageItem = (): DataType => {
        const storageData = localStorage.getItem(this.token) ?? '';
        return !!storageData ? JSON.parse(storageData) : {};
    }

}

export const languageStorage = new LocalStorage<{current: string}, string>({token: languageToken});
export const cityStorage = new LocalStorage<CitiesStorage<CityStorage>, CityStorage>({token: citiesToken});
export const citySettingsStorage = new LocalStorage<CitiesStorage<CitySettings>, CitySettings>({token: citiesSettingsToken});
