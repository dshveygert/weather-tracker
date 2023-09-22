import {TemperatureUnit} from "../../../types/sharedTypes";

export type CityStorage = {
    id: string;
    cityName: string;
    lat: number;
    lon: number;
    country: string;
    state?: string;
}

export type CitySettings = {
    cityId: string;
    position: number;
    units: TemperatureUnit;
}

export type CitiesStorage<T> = {[cityId: string]: T};
