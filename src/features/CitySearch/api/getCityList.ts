import {publicHttp, weatherApiKey} from "../../../services/httpClient";
import {queryParamsSerializer} from "../../../utils/queryParamsSerializer";
import ApiRequests from "../../../services/apiRequests";
import {City} from "../../../types/sharedTypes";

const apiUrl = `/geo/1.0/direct`;
const getCityList = (text: string) => {
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

export const getCityListRequest = new ApiRequests<string, City[]>({
    apiFunction: getCityList
})
