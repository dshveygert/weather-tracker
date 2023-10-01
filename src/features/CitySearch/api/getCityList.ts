import {publicHttp, weatherApiKey} from '../../../services/httpClient';
import {queryParamsSerializer} from '../../../utils/queryParamsSerializer';

const apiUrl = `/geo/1.0/direct`;
export const getCityList = (text: string) => {
    const url = `${apiUrl}`;
    const params = {
        q: text,
        limit: 3,
        appid: weatherApiKey
    };
    return publicHttp.get(url, {
        params,
        paramsSerializer: {
            serialize: queryParamsSerializer,
            indexes: false
        }
    });
};
