import React from 'react';
import {Col, ConfigProvider, Layout, Row, Space} from 'antd';
import {defaultTheme} from './consts/theme';
import Cities from "./pages/Cities/Cities";
import './App.sass';

const {Header, Content} = Layout;

function App() {
    return (
        <ConfigProvider
            theme={defaultTheme}
        >
            <Space direction="vertical" className={'space'}>
                <Layout>
                    <Header></Header>
                    <Content>
                        <Row justify="space-between">
                            <Col xs={{span: 24, offset: 0}} lg={{span: 22, offset: 1}}>
                                <Cities/>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </Space>
        </ConfigProvider>
    );
}

export default App;
