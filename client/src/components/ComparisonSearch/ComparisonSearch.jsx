// Required
import React, { useContext } from 'react';

import { AppContext } from "../Context/Context";
import { withRouter } from "react-router-dom";

// Ant D 
import { Row, Col, Typography } from 'antd';

// Css
import './ComparisonSearch.css'

// Algolia 
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Configure, Index, connectStateResults, connectHits, connectSearchBox } from 'react-instantsearch-dom';

//#23263b
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

const { Text } = Typography;

const ComparisonSearch = ({ history }) => {
    const { setSearch } = useContext(AppContext);

    const handleSetSearch = (e, searchValue) => {
        const value = searchValue;

        if(e.keyCode === 13){
            e.preventDefault(); 

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
                        search: `?q=${setSearch}`
                    })
                }
            } else {
                return
            }  
        } 
    };

    const handleResultSearch = (suggestionValue) => {
        const value = suggestionValue

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
                    search: `?q=${setSearch}`
                })
            }
        } else {
            return
        }  
    }

    // Prolem is that the event listener is getting a value, the problem is that it is reaidng the other 
    // search bar which is empty causing query not to go 
    return (
    <>
        <Row className="frontpage-section" justify="center" align="middle">
            <Col span={12} className="searchCol">
                <Text strong className="searchBarTitle">
                    Compare tech price's across major brands.
                </Text>
                <Row style={{marginBottom: '1rem'}}></Row>
                <InstantSearch indexName="productionProducts" searchClient={searchClient}>
                    {/* <CustomSearch handleSetSearch={handleSetSearch}  /> */}
                    {/* ---------*/}
                    {/* <Index indexName="productionProducts">
                        <Configure 
                            hitsPerPage={2} 
                            distinct
                        />
                        <CustomHits history={history} handleResultSearch={handleResultSearch}/>
                    </Index>

                    <Index indexName="sephora">
                        <Configure 
                            hitsPerPage={2} 
                            distinct
                        />
                        <CustomHits history={history} handleResultSearch={handleResultSearch}/>
                    </Index> */}
                    {/* ---------*/}

                    <Configure 
                        hitsPerPage={4} 
                        distinct
                    />
                    <CustomSearch handleSetSearch={handleSetSearch}  />
                    <Results>
                        <CustomHits history={history} handleResultSearch={handleResultSearch}/>
                    </Results>
                </InstantSearch>
            </Col>
            <Col span={22} className="mobileSearchCol">
                <Text strong className="searchBarTitle">
                    Compare makeup price's across major brands.
                </Text>
                <InstantSearch indexName="productionProducts" searchClient={searchClient}>
                    <Configure 
                        hitsPerPage={4} 
                        distinct
                    />
                    <CustomSearch handleSetSearch={handleSetSearch}  />
                    <Results>
                        <CustomHits history={history} handleResultSearch={handleResultSearch}/>
                    </Results>
                </InstantSearch>
            </Col>
        </Row>
    </>
    );
}

const CustomSearch = connectSearchBox(({currentRefinement, refine, handleSetSearch}) => {
    return (
        <div className="ais-SearchBox">
            <form className="ais-SearchBox-form">
                <input
                    type="search"
                    placeholder="Enter a product title..."
                    autoComplete="on"
                    autoCorrect="on"
                    spellCheck="true"
                    required
                    value={currentRefinement}
                    onChange={e => refine(e.target.value)}
                    onKeyDown={e => handleSetSearch(e, currentRefinement)}
                    className="ais-SearchBox-input"
                />
            </form>
        </div>
    )
});

const CustomHits = connectHits(({hits, handleResultSearch}) => {
    return (
        <Col className="ais-Hits"> 
            {hits.map(hit => (
                <Row 
                    className="ais-Hits-item" 
                    onClick={() => handleResultSearch(hit.title)} 
                    key={hit.objectID}
                >
                    <Text ellipsis={true}>{hit.title}</Text>
                </Row>
            ))}
        </Col> 
    )
});

const Results = connectStateResults(({ searchState, searchResults, children }) =>
    searchResults && searchResults.nbHits !== 0 ? (
      children
    ) : (
        <>
            {searchState.query ? 
                <div className="ais-Hits"> 
                    <ul className="ais-Hits-list">
                        <li className="ais-Hits-item">
                            <Text ellipsis={true}>No results found for: {searchState.query}</Text>
                        </li>
                    </ul>
                </div> 
            : null}
        </>
    )
);

export default withRouter(ComparisonSearch);
