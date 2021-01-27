import React from 'react';
import '../../App.css'
import { Input, Row, Col, Typography, Divider } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import './ComparisonSearch.css'

const { Search } = Input;
const { Title } = Typography;

const ComparisonSearch = () => {
    return (
    <>
        <Row justify="center" align="middle" style={{height: '200px',margin: '5% 0 5% 0', textAlign: 'center'}}>
            <Col span={12}>
                <Title style={{marginBottom: '5%'}}>Compare makeup prices across major brands.</Title>
                <Search placeholder="Enter a product title" size="large" prefix={<SearchOutlined />} enterButton/>
            </Col>
        </Row>
        <Divider style={{padding: '0 16% 5% 16%'}}>Or</Divider>
    </>
    );
}

export default ComparisonSearch;
