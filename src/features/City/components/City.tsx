import React, {FC} from 'react';
import {CloseOutlined} from '@ant-design/icons';
import {CityProps} from '../types';
import './city.sass';

const City: FC<CityProps> = (props) => {
    const {cityName, country, removeCity} = props;
    return <div className={'city'}>
        <div className={'title'}>{cityName}, {country}</div>
        <div className={'date'}>Fri, 19 September, 10:19</div>
        <div className={'remove'}><CloseOutlined onClick={removeCity}/></div>
    </div>;
};
export default City;
