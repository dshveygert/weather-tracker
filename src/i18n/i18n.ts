import {use} from 'i18next';
import {initReactI18next} from 'react-i18next';
import backend from 'i18next-http-backend';

const i18n = use(backend)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        lng: 'en',
        debug: false,
        returnNull: false,
        detection: {
            order: ['queryString', 'cookie'],
            cache: ['cookie']
        },
        interpolation: {
            escapeValue: false
        },
        backend: {
            queryStringParams: {v: '1.0'}
        }
    }).then();
export default i18n;
