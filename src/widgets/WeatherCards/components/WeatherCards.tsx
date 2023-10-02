import React, {FC, useEffect, useState} from 'react';
import City from '../../../features/City/City';
import './weatherCards.sass';
import {getWeatherList} from "../utils";

const WeatherCards: FC = () => {
    const cardWrapper = 'cardWrapper warm';
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        // ToDo: Change to real data
        getWeatherList([
            {lat: 55.0282171, lon: 82.9234509},
            {lat: 54.743766199999996, lon: 83.06268907860164},
            {lat: 45.4112, lon: -75.6981},
            {lat: 47.6062, lon: -122.3321},
            {lat: 41.3888, lon: 2.159}
        ]).then(() => {
            setIsLoading(false);
        });
    }, []);

    return <div className={cardWrapper}>
        <div className={'card'}>
            <div className={'header'}><City/></div>
            <div className={'chart'}></div>
            <div className={'weather'}></div>
        </div>
    </div>;
};
export default WeatherCards;
