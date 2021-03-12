import React from 'react';

// Antd
import { Layout, Menu, Input  } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

// Css
import './SubNav.css'

const { Header } = Layout;
const { Search } = Input;

const SubNav = () => {
    return (    
    <>
        <Layout theme='light'>
            <Header theme='light' style={{ background: '#fff' }} > 
                <Menu
                    mode='horizontal'
                    style={{ float: 'left'}} // margin: '0 20px', padding: '20px'
                    theme='light'
                >
                    <Menu.Item key='1' className="remove-border">
                        <Search 
                            className="searchBar" 
                            placeholder="Enter a product title" 
                            size="large" 
                            prefix={<SearchOutlined />} 
                            enterButton
                            style={{borderRadius: '8px'}}
                        />
                    </Menu.Item>
                </Menu>
            </Header>
        </Layout>
    </>
    )
}

export default SubNav