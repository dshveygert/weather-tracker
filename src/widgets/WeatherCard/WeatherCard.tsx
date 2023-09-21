import React, {FC} from 'react';
import City from '../../features/City/City';
import './weatherCard.sass';

const WeatherCard: FC = () => {
    const cardWrapperClass = 'cardWrapper warm';
    return <div className={cardWrapperClass}>
        <div className={'card'}>
            <div className={'header'}><City/></div>
            <div className={'chart'}></div>
            <div className={'weather'}></div>
        </div>
    </div>;
};
export default WeatherCard;
