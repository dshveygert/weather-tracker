import React from 'react';
import {ConfigProvider, Layout, Space} from 'antd';
import './App.sass';
import {defaultTheme} from "./components/antd/theme";

const {Header, Content} = Layout;

function App() {
    return (
        <ConfigProvider
            theme={defaultTheme}
        >
            <Space direction="vertical" className={'space'}>
                <Layout>
                    <Header ></Header>
                    <Content></Content>
                </Layout>
            </Space>
        </ConfigProvider>
    );
}

export default App;
