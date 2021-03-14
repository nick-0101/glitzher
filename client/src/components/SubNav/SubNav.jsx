import React from 'react';

// Antd
import { Layout, Input  } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

// Css
import './SubNav.css'

const { Header } = Layout;
const { Search } = Input;

const SubNav = () => {
    return (    
    <>
        <Layout theme='light'>
            <Header theme='light' className="subMenuHeader" style={{ background: '#fff' }} >
                <div className="subMenuWrapper">
                    <div className="subNav-logo">Logo</div> 
                    <Search 
                        className="subSearchBar" 
                        placeholder="Enter a product title" 
                        size="small" 
                        prefix={<SearchOutlined />} 
                        enterButton
                        style={{borderRadius: '8px'}}
                    />
                </div>
            </Header>
        </Layout>
    </>
    )
}

export default SubNav