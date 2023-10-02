import React, {FC, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import './languageSwitch.sass';
import {useTranslation} from 'react-i18next';
import {Select} from 'antd';
import {languageStorage} from "../../../utils/localStorage/utils/localStorage";

const languages = [{value: 'en', label: 'EN'}, {value: 'ru', label: 'RU'}, {value: 'ua', label: 'UA'}];

const LanguageSwitch: FC = observer(() => {
    const {i18n} = useTranslation();
    const handleChange = (language: string) => {
        i18n.changeLanguage(language);
        languageStorage.addItem('current', language);
    };
    useEffect(() => {
        const language = languageStorage.getItem();
        !!language?.current && i18n.changeLanguage(language.current);
    }, []);

    return <div className={'languageSwitch'}>
        <Select
            style={{width: 120}}
            onChange={handleChange}
            options={languages}
            value={i18n.language}
        />
    </div>;
});
export default LanguageSwitch;
