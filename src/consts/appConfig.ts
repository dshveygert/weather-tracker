export default {
    publicApi: {
        weatherUrl: process.env.REACT_APP_API_WEATHER_URL ?? '/',
        weatherKey: process.env.REACT_APP_API_WEATHER_SECRET ?? 'XXXXXX'
    }
};
