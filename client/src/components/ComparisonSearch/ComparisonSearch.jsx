// Required
import React, { useContext, useState } from 'react';

import { AppContext } from "../Context/Context";
import { withRouter } from "react-router-dom";

// Ant D 
import { Input, Row, Col, Typography, Divider } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

// Css
import './ComparisonSearch.css'
import 'instantsearch.css/themes/satellite.css';

// Algolia 
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Hits, SearchBox, Configure } from 'react-instantsearch-dom';

const algoliaClient = algoliasearch('GRXWQQHS2I', 'babd585148a07355c43a354cc0aece0f');

const searchClient = {
  search(requests) {
    if (requests.every(({ params }) => !params.query)) {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          nbPages: 0,
          processingTimeMS: 0,
        })),
      });
    }

    return algoliaClient.search(requests);
  },
};

const { Search } = Input;
const { Text } = Typography;

const ComparisonSearch = ({ history }) => {
    const { setSearch } = useContext(AppContext);
    const [isEmpty, setIsEmpty] = useState(true)

    const handleSetSearch = (value) => {
    //     if (value !== '') {
    //         if (typeof(Storage) !== "undefined") {
    //             sessionStorage.removeItem('searchResult');
    //             sessionStorage.setItem("searchResult", value);

    //             // Complete search
    //             history.push({  
    //                 pathname: '/search',
    //                 search: `?q=${sessionStorage.getItem("searchResult")}`
    //             })
    //         } else {
    //             console.log('No session storage support')
                
    //             // Complete search with context
    //             setSearch(value);
    //             history.push({
    //                 search: `?q=${setSearch}`
    //             })
    //         }
    //     } else {
    //         return
    //     }  
    };

    return (
    <>
        <Row className="frontpage-section" justify="center" align="middle" style={{height: '400px', padding: '5% 0 5% 0', textAlign: 'center'}}>
            <Col span={12} className="searchCol">
                <Text strong className="searchBarTitle">
                    Compare makeup price's across major brands.
                </Text>
                <InstantSearch indexName="productionProducts" searchClient={searchClient}>
                    <Configure 
                        hitsPerPage={8} 
                        distinct
                    />
                    <SearchBox 
                        translations={{
                            submitTitle: 'Submit your search.',
                            resetTitle: 'Clear your search query.',
                            placeholder: 'Enter a product title...',
                        }}
                        onSubmit={event => {
                            event.preventDefault();
                            console.log(event.currentTarget);
                        }}
                        showLoadingIndicator 
                    />
                    {isEmpty ? null : <Hits hitComponent={Hit}/>}
                </InstantSearch>
                {/* <Search 
                    className="searchBar" 
                    onSearch={handleSetSearch} 
                    placeholder="Enter a product title" 
                    size="large" 
                    prefix={<SearchOutlined />} 
                    enterButton
                    style={{borderRadius: '8px'}}
                /> */}
            </Col>
            <Col span={22} className="mobileSearchCol">
                <Text strong className="searchBarTitle">
                    Compare makeup price's across major brands.
                </Text>
                <InstantSearch indexName="productionProducts" searchClient={searchClient}>
                    <Configure 
                        hitsPerPage={8} 
                        distinct
                    />
                    <SearchBox 
                        onSubmit={event => {
                            event.preventDefault();
                            console.log(event.currentTarget);
                        }}
                        translations={{
                            submitTitle: 'Submit your search.',
                            resetTitle: 'Clear your search query.',
                            placeholder: 'Enter a product title...',
                        }}
                        showLoadingIndicator 
                    />
                    <Hits hitComponent={Hit}/>
                </InstantSearch>
                {/* <Search 
                    className="searchBar" 
                    onSearch={handleSetSearch}
                    placeholder="Enter a product title" 
                    size="large"
                    prefix={<SearchOutlined />} 
                    enterButton
                    style={{borderRadius: '8px'}}
                /> */}
            </Col>
        </Row>
        <Divider style={{padding: '0 16% 5% 16%'}}>Or</Divider>
    </>
    );
}

const Hit = ({ hit }) => {
    return (
        <Col> 
            <Row>{hit.title}</Row>
        </Col>
    )
};

export default withRouter(ComparisonSearch);
