import {ThemeConfig} from "antd";

export const defaultTheme: ThemeConfig = {
    token: {
        colorPrimaryBg: '#ffffff'
    },
    components: {
        Layout: {
            headerBg: 'transparent',
            bodyBg: 'transparent',
            headerPadding: 0
        }
    }
};
