import {use} from 'i18next';
import {initReactI18next} from 'react-i18next';
import backend from 'i18next-http-backend';

const i18n = use(initReactI18next)
    .use(backend)
    .init({
        debug: true,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        },
        backend: {
            loadPath: `/localization/{{lng}}/{{ns}}.json`,
            queryStringParams: { v: '1.0' }
        }
    });

export default i18n;
