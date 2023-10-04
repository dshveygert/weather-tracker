import React, {FC, useCallback, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import City from '../../../features/City/components/City';
import './weatherCards.sass';
import {useRootStore} from '../../../store/rootStore.context';
import {CityProps} from "../../../features/City/types";

const WeatherCards: FC = observer(() => {
    const {
        citiesStore: {cities, initCitiesFromLocalStorage, removeCityFromList},
        weatherStore: {requestWeatherForCityList, weatherLoading, weather: weatherObj}
    } = useRootStore();
    const savedCitiesLength = Object.keys(cities).length;
    useEffect(() => {
        if (savedCitiesLength) {
            requestWeatherForCityList({...cities});
        }
    }, [savedCitiesLength]);

    useEffect(() => {
        initCitiesFromLocalStorage();
    }, []);

    const removeCity = useCallback((cityId: string) => {
        removeCityFromList(cityId)
    }, []);

    return <>
        {Object.keys(cities).map((key: string) => {
            const {cityId, main, dt, timezone} = {...weatherObj[key]};
            const { temp = '' } = main ?? {};
            const cityData: CityProps = {...cities[key], dateTime: dt, timezone, removeCity: () => removeCity(cityId)};
            const cardWrapperClassName = `cardWrapper ${temp && temp >= 0 ? 'warm' : 'cold'}`; // TODO Fix for different units (C, F, K)
            return <div className={cardWrapperClassName}>
                <div className={'card'} key={key}>
                    <div className={'header'}><City {...cityData}/></div>
                    <div className={'chart'}></div>
                    <div className={'weather'}>{temp}</div>
                </div>
            </div>
        })}
    </>
});
export default WeatherCards;
