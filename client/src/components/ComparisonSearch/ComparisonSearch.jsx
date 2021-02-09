import React, { useContext } from 'react';
import { AppContext } from "../Context/Context";
import { withRouter } from "react-router-dom";
import { Input, Row, Col, Typography, Divider } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import './ComparisonSearch.css'

const { Search } = Input;
const { Title } = Typography;

const ComparisonSearch = ({ history  }) => {
    const { setSearch } = useContext(AppContext);

    const handleSetSearch = (value) => {
        if (value !== '') {
            if (typeof(Storage) !== "undefined") {
                sessionStorage.removeItem('searchResult');
                sessionStorage.setItem("searchResult", value);
            } else {
                console.log('No session storage support')
            }

            setSearch(value);
            history.push({
                pathname: '/search',
                search: `?q=${sessionStorage.getItem("searchResult")}`
            })
        } else {
            return
        }
    };

    return (
    <>
        <Row justify="center" align="middle" style={{height: '200px',margin: '5% 0 5% 0', textAlign: 'center'}}>
            <Col span={12}>
                <Title style={{marginBottom: '5%'}}>Compare makeup prices across major brands.</Title>
                <Search onSearch={handleSetSearch} placeholder="Enter a product title" size="large" prefix={<SearchOutlined />} enterButton/>
            </Col>
        </Row>
        <Divider style={{padding: '0 16% 5% 16%'}}>Or</Divider>
    </>
    );
}

export default withRouter(ComparisonSearch);
