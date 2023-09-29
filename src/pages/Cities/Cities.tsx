import React, {FC} from 'react';

import CitySearch from '../../features/CitySearch/components/CitySearch';
import WeatherCards from '../../widgets/WeatherCards/components/WeatherCards';
import './cities.sass';

const Cities: FC = () => {
    return <div className={'cities'}>
        <div className={'row search'}>
            <CitySearch/>
        </div>
        <div className={'row'}>
            <WeatherCards/>
        </div>
    </div>;
};
export default Cities;
