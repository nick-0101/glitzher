import React, { useContext } from 'react';
import { AppContext } from "../Context/Context";
import { withRouter } from "react-router-dom";

// Antd
import { Layout, Input  } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

// Css
import './SubNav.css'

const { Header } = Layout;
const { Search } = Input;

const SubNav = ({ history  }) => {
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
                window.location.reload()  
            } else {
                console.log('No session storage support')

                // Complete search with context
                setSearch(value)
                history.push({
                    pathname: '/search',
                    search: `?q=${setSearch}`
                })
                window.location.reload()  
            }
        } else {
            return
        }
    };

    return (    
    <>
        <Layout theme='light'>
            <Header theme='light' className="subMenuHeader" style={{ background: '#fff' }} >
                <div className="subMenuWrapper">
                    <div className="subNav-logo">Logo</div> 
                    <Search 
                        className="subSearchBar" 
                        onSearch={handleSetSearch} 
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

export default withRouter(SubNav);