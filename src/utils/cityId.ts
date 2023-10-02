import {City} from "../types/sharedTypes";

export const generateCityId = (city: City): string => {
    const {lat, lon, name} = city;
    return `${name.toLowerCase()}|${lat}|${lon}`;
}
