import React, {FC} from 'react';
import WeatherCard from "../../widgets/WeatherCard/WeatherCard";
import './cities.sass';
import CitySearch from "../../features/CitySearch/components/CitySearch";

const Cities: FC = () => {
    return <div className={'cities'}>
        <div className={'row search'}>
            <CitySearch/>
        </div>
        <div className={'row'}>
            {[1, 2, 3, 4, 5, 6].map((item, idx) => {
                return <WeatherCard key={idx}/>
            })}
        </div>
    </div>;
};
export default Cities;
