import {CityStorage} from '../../../utils/localStorage';

export type CityProps = CityStorage & {
    dateTime: number;
    timezone?: number;
    removeCity: () => void;
}
