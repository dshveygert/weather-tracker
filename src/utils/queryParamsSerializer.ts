export const queryParamsSerializer = (params: Record<string, any>): string => {
    if (!params) {
        return '';
    }
    return Object.keys(params).filter((key) => !!params[key])
        .map((key) => {
            const value = params[key];
            if (!!value && Array.isArray(value)) {
                return value.map((item) => `${key}=${item.toString()}`).join('&');
            } else {
                return value ? `${key}=${value.toString()}` : '';
            }
        })
        .filter((item) => !!item)
        .join('&');
};
