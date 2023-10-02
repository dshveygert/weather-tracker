import {TemperatureUnit} from '../../../types/sharedTypes';

export type Coordinates = {
    lat: number;
    lon: number;
};

export type WeatherByCoordinatesRequest = Coordinates & {
    units?: TemperatureUnit;
}

//https://openweathermap.org/current#geo

export type WeatherByCoordinatesResponse = {
    coord: Coordinates,
    weather: {
        id: number | string;
        main: string;
        description?: string;
        icon: string;
    }
    vase: string;
    main: {
        temp: number;
        feels_like: number;
        pressure: number;
        humidity: number;
        temp_min: number;
        temp_max: number;
        sea_level: number;
        grnd_level: number;
    };
    visibility: number;
    wind: {
        speed: number;
        deg: number;
        gust: number;
    };
    clouds: {
        all: number;
    };
    rain?: {
        "1h"?: number;
        "3h"?: number;
    };
    snow?: {
        "1h"?: number;
        "3h"?: number;
    };
    dt: number;
    sys: {
        type: number;
        id: number;
        sunrise: number;
        sunset: number;
        message: string;
        country: string;
    },
    timezone: number;
    id: number;
    cod: number;
    name: string;
}
