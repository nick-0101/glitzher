// Required
import React, { useContext } from 'react';
import { AppContext } from "../Context/Context";
import { withRouter } from "react-router-dom";

// Ant D 
import { Input, Row, Col, Typography, Divider } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

// Css
import './ComparisonSearch.css'

const { Search } = Input;
const { Text } = Typography;

const ComparisonSearch = ({ history  }) => {
    const { setSearch } = useContext(AppContext);

    const handleSetSearch = (value) => {
        if (value !== '') {
            if (typeof(Storage) !== "undefined") {
                sessionStorage.removeItem('searchResult');
                sessionStorage.setItem("searchResult", value);

                // Complete search
                history.push({  
                    pathname: '/search',
                    search: `?q=${sessionStorage.getItem("searchResult")}`
                })
            } else {
                console.log('No session storage support')
                
                // Complete search with context
                setSearch(value);
                history.push({
                    pathname: '/search',
                    search: `?q=${setSearch}`
                })
            }
        } else {
            return
        }  
    };

    return (
    <>
        <Row className="frontpage-section" justify="center" align="middle" style={{height: '400px', padding: '5% 0 5% 0', textAlign: 'center'}}>
            <Col span={12} className="searchCol">
                <Text strong className="searchBarTitle">
                    Compare makeup price's across major brands.
                </Text>
                <Search className="searchBar" onSearch={handleSetSearch} placeholder="Enter a product title" size="large" prefix={<SearchOutlined />} enterButton/>
            </Col>
            <Col span={22} className="mobileSearchCol">
                <Text strong className="searchBarTitle">
                    Compare makeup price's across major brands.
                </Text>
                <Search className="searchBar" onSearch={handleSetSearch} placeholder="Enter a product title" size="large" prefix={<SearchOutlined />} enterButton/>
            </Col>
        </Row>
        <Divider style={{padding: '0 16% 5% 16%'}}>Or</Divider>
    </>
    );
}

export default withRouter(ComparisonSearch);
