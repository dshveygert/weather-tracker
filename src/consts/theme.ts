import {ThemeConfig} from "antd";

export const defaultTheme: ThemeConfig = {
    token: {
        colorPrimaryBg: '#ffffff',
        fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
        fontSize: 12
    },
    components: {
        Layout: {
            headerBg: 'transparent',
            bodyBg: 'transparent',
            headerPadding: 0
        },
        Space: {
            padding: 24
        }
    }
};
