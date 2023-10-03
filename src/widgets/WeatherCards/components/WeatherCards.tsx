import React, {FC, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import City from '../../../features/City/components/City';
import './weatherCards.sass';
import {useRootStore} from '../../../store/rootStore.context';
import {CityProps} from "../../../features/City/types";

const WeatherCards: FC = observer(() => {
    const {
        citiesStore: {cities, initCitiesFromLocalStorage},
        weatherStore: {requestWeatherForCityList, weatherLoading, weather: weatherObj}
    } = useRootStore();
    const savedCitiesLength = Object.keys(cities).length;
    useEffect(() => {
        if (savedCitiesLength) {
            console.log('useEffect on savedCitiesLength');
            // ToDo: Change to real data
            requestWeatherForCityList({...cities});
        }

    }, [savedCitiesLength]);

    useEffect(() => {
        initCitiesFromLocalStorage();
    }, []);


    console.log('WeatherCards render \n cities length', savedCitiesLength);
    return <>
        {Object.keys(weatherObj)?.length > 0 && Object.keys(weatherObj).map((key: string) => {
            const {cityId, main, name, dt, timezone} = {...weatherObj[key]};
            const cityData: CityProps = {...cities[key], dateTime: dt, timezone};
            const cardWrapperClassName = `cardWrapper ${main.temp > 0 ? 'warm' : 'cold'}`; // TODO Fix for different units (C, F, K)
            return <div className={cardWrapperClassName}>
                <div className={'card'} key={cityId}>
                    <div className={'header'}><City {...cityData}/></div>
                    <div className={'chart'}></div>
                    <div className={'weather'}>{main.temp}</div>
                </div>
            </div>
        })}
    </>
});
export default WeatherCards;
