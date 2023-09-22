export enum TemperatureUnit {
    Fahrenheit = 'imperial',
    Celsius = 'metric',
    Kelvin = 'standard'
}

export type LocaleName = {
    [key: string]: string;
};

export type City = {
    name: string;
    lat: number;
    lon: number;
    country: string;
    state?: string;
    local_names?: LocaleName;
};

