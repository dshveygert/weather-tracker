import React, {FC} from 'react';
import {Col, ConfigProvider, Layout, Row, Space} from 'antd';
import {defaultTheme} from './consts/theme';
import Cities from "./pages/Cities/Cities";
import './App.sass';
import {useTranslation} from 'react-i18next';
import {RootStoreProvider} from "./store/rootStore.context";

const {Header, Content} = Layout;

const App: FC = () => {
    const {i18n} = useTranslation();
    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
    };

    return (
        <ConfigProvider
            theme={defaultTheme}
        >
            <Space direction="vertical" className={'space'}>
                <RootStoreProvider>
                    <Layout>
                        <Header>
                            <button onClick={() => changeLanguage("en")}>EN</button>
                            <button onClick={() => changeLanguage("ua")}>RU</button>
                            <button onClick={() => changeLanguage("ru")}>UA</button>
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
