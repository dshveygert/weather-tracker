import React, {FC, useCallback, useEffect, useState} from 'react';
import {Button, Select, SelectProps} from "antd";
import './citySearch.sass';
import {getCityListRequest} from "../api/getCityList";
import useDebounce from "../../../hooks/useDebounce";
import {useTranslation} from 'react-i18next';

const CitySearch: FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [city, setCity] = useState<string>();
    const [citySearch, setCitySearch] = useState<string>('');
    const [cityOptions, setCityOptions] = useState<SelectProps['options']>([]);
    const debouncedCitySearch = useDebounce(citySearch, 1000);
    const {t} = useTranslation(['citySearch', 'index']);
    const handleSearch = (searchText: string) => {
        setCitySearch(searchText);
    };

    const handleChange = (newValue: string) => {
        setCity(newValue);
    };

    const handleCityAdd = useCallback(() => {
        const cityToAdd = getCityListRequest.data?.find(item => {
            const {name, country, state, lat, lon} = item;
            return `${name},${state},${country},lat=${lat},lon=${lon}` === city;
        });
        console.log('handleCityAdd', cityToAdd);
    }, [city]);

    const isAddCityDisabled = !city;

    useEffect(() => {
        if (debouncedCitySearch) {
            setIsLoading(true);
            getCityListRequest.send(debouncedCitySearch).then(result => {
                result && result.length && setCityOptions(result.map(item => {
                    const {name, local_names, country, state, lat, lon} = item;
                    const label = local_names && local_names['en'] ? `${local_names['en']}, ${country}` : `${name}, ${country}`;
                    const value = `${name},${state},${country},lat=${lat},lon=${lon}`; // Ant Select needs a unique key
                    return {value, label};
                }));
                setIsLoading(false);
            });
        }
    }, [debouncedCitySearch]);

    return <div className={'citySearch'}>
        <Select
            showSearch
            value={city}
            defaultActiveFirstOption={false}
            suffixIcon={null}
            filterOption={false}
            onSearch={handleSearch}
            onChange={handleChange}
            notFoundContent={null}
            options={(cityOptions || [])}
            className={'citySearchSelect'}
            loading={isLoading}
        />
        <Button type="primary" disabled={isAddCityDisabled}
                onClick={handleCityAdd}>{t('citySearch:buttons.add')}</Button>
    </div>;
};
export default CitySearch;
