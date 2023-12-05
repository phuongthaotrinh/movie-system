import type {ThemeConfig} from 'antd';

const theme: ThemeConfig = {
    token: {
        borderRadius: 3,

    },
    components: {
        Form: {
            itemMarginBottom: 8
        },
        Switch: {
            colorPrimary: "rgb(8, 8, 8)",
            colorTextQuaternary: "rgba(2, 2, 2, 0.25)",
            colorTextTertiary:  "rgba(2, 2, 2, 0.25)",
        },
        Typography: {
            colorLink: "rgb(56, 57, 59)"
        },
        Segmented:{
            colorBgLayout: "rgba(0, 0, 0, 0.15)",
        }
    },

};

export default theme;