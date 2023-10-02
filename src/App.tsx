import React, {FC} from 'react';
import {Col, ConfigProvider, Layout, Row, Space} from 'antd';
import {defaultTheme} from './consts/theme';
import Cities from "./pages/Cities/Cities";
import './App.sass';
import {RootStoreProvider} from "./store/rootStore.context";
import LanguageSwitch from "./features/LanguageSwitch/components/LanguageSwitch";

const {Header, Content} = Layout;

const App: FC = () => {

    return (
        <ConfigProvider
            theme={defaultTheme}
        >
            <Space direction="vertical" className={'space'}>
                <RootStoreProvider>
                    <Layout>
                        <Header>
                            <Row justify="space-between">
                                <Col xs={{span: 24, offset: 0}} lg={{span: 22, offset: 1}}>
                                    <div className="headerWrapper">
                                        <LanguageSwitch/>
                                    </div>
                                </Col>
                            </Row>
                        </Header>
                        <Content>
                            <Row justify="space-between">
                                <Col xs={{span: 24, offset: 0}} lg={{span: 22, offset: 1}}>
                                    <Cities/>
                                </Col>
                            </Row>
                        </Content>
                    </Layout>
                </RootStoreProvider>
            </Space>
        </ConfigProvider>
    );
}

export default App;
