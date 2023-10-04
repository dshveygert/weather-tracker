import React, {FC, useCallback, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {Button, Select, SelectProps} from 'antd';
import './citySearch.sass';
import useDebounce from "../../../hooks/useDebounce";
import {useTranslation} from 'react-i18next';
import {generateCityId} from '../../../utils/cityId';
import {useRootStore} from '../../../store/rootStore.context';

export const CitySearch: FC = observer(() => {
    const [city, setCity] = useState<string>();
    const [citySearch, setCitySearch] = useState<string>('');
    const [cityOptions, setCityOptions] = useState<SelectProps['options']>([]);
    const debouncedCitySearch = useDebounce(citySearch, 1000);
    const {t} = useTranslation();
    const {
        citiesStore: {searchCityLoading, searchedCity, searchCity, isCityListReachedLimit, addCityToList}
    } = useRootStore();
    const handleSearch = (searchText: string) => {
        setCitySearch(searchText);
    };

    const handleChange = (newValue: string) => {
        setCity(newValue);
    };

    const handleCityAdd = useCallback(() => {
        const cityToAdd = searchedCity.find(item => {
            return generateCityId(item) === city;
        });
        if (cityToAdd) {
            addCityToList(cityToAdd);
            setCity('');
        }
    }, [city]);

    const isAddCityDisabled = !city || isCityListReachedLimit;

    useEffect(() => {
        if (debouncedCitySearch) {
            searchCity(debouncedCitySearch);
        }
    }, [debouncedCitySearch]);

    useEffect(() => {
        searchedCity && searchedCity.length && setCityOptions(searchedCity.map(item => {
            const {name, local_names, country} = item;
            const label = local_names && local_names['en'] ? `${local_names['en']}, ${country}` : `${name}, ${country}`;
            const value = generateCityId(item); // Ant Select needs a unique key
            return {value, label};
        }));
    }, [searchedCity]);

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
            loading={searchCityLoading}
        />
        <Button type="primary" disabled={isAddCityDisabled}
                onClick={handleCityAdd}>{t('buttons.add')}</Button>
    </div>;
});
