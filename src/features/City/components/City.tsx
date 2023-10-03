import React, {FC} from 'react';
import './city.sass';
import { CityProps } from '../types';

const City: FC<CityProps> = (props) => {
    const {cityName, country} = props;
    return <div className={'city'}>
        <div className={'title'}>{cityName}, {country}</div>
        <div className={'date'}>Fri, 19 September, 10:19</div>
    </div>;
};
export default City;
