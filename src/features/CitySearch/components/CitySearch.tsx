import React, {FC, useCallback, useEffect, useState} from 'react';
import {Button, Select, SelectProps} from "antd";
import './citySearch.sass';
import {getCityListRequest} from "../api/getCityList";
import useDebounce from "../../../hooks/useDebounce";
import {useTranslation} from 'react-i18next';
import {cityStorage} from "../../../utils/localStorage/utils/localStorage";
import {generateCityId} from "../../../utils/cityId";

const CitySearch: FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [city, setCity] = useState<string>();
    const [citySearch, setCitySearch] = useState<string>('');
    const [cityOptions, setCityOptions] = useState<SelectProps['options']>([]);
    const debouncedCitySearch = useDebounce(citySearch, 1000);
    const {t} = useTranslation();
    const handleSearch = (searchText: string) => {
        setCitySearch(searchText);
    };

    const handleChange = (newValue: string) => {
        setCity(newValue);
    };

    const handleCityAdd = useCallback(() => {
        const cityToAdd = getCityListRequest.data?.find(item => {
            return generateCityId(item) === city;
        });
        if (cityToAdd) {
            const {name, country, lat, lon} = cityToAdd;
            const id = generateCityId(cityToAdd);
            cityToAdd && cityStorage.addItem(id, {cityName: name, country, lat, lon, id});
        }
    }, [city]);

    const isAddCityDisabled = !city;

    useEffect(() => {
        if (debouncedCitySearch) {
            setIsLoading(true);
            getCityListRequest.send(debouncedCitySearch).then(result => {
                result && result.length && setCityOptions(result.map(item => {
                    const {name, local_names, country} = item;
                    const label = local_names && local_names['en'] ? `${local_names['en']}, ${country}` : `${name}, ${country}`;
                    const value = generateCityId(item); // Ant Select needs a unique key
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
                onClick={handleCityAdd}>{t('buttons.add')}</Button>
    </div>;
};
export default CitySearch;
