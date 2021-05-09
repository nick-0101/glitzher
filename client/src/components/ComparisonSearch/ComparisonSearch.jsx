// App
import React, { useContext } from 'react';
import { AppContext } from "../Context/Context";
import { withRouter } from "react-router-dom";


// // Css
import './ComparisonSearch.css'

// Algolia 
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Configure, Index, connectStateResults, connectHits, connectSearchBox } from 'react-instantsearch-dom';

// //#23263b
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
    return (
    <>
        <div className="flex justify-center h-screen/1 max-w-7xl mx-auto px-4 sm:px-20 text-center bg-hero">
            <div className="w-3/3 md:w-2/3 flex flex-col mx-auto my-44">
                <div className="text-4xl md:text-5xl font-medium text-gray-800 mb-8 leading-tight">
                    Compare cosmetic price's across <span style={{color: '#FC0F42'}}>major brands.</span>
                </div>
                <InstantSearch indexName="amazonProducts" searchClient={searchClient}>
                    <CustomSearch handleSetSearch={handleSetSearch} />

                    <Index indexName="amazonProducts">
                        <Configure hitsPerPage={1} />
                        <Results>
                            <CustomHits history={history} handleResultSearch={handleResultSearch}/>
                        </Results>
                    </Index>

                    <Index indexName="sephoraProducts">
                        <Configure hitsPerPage={2} />
                        <Results>
                            <CustomHits history={history} handleResultSearch={handleResultSearch}/>
                        </Results>
                    </Index>

                    <Index indexName="shoppersdrugmartProducts">
                        <Configure hitsPerPage={2} />
                        <Results>
                            <CustomHits history={history} handleResultSearch={handleResultSearch}/>
                        </Results>
                    </Index>
                </InstantSearch>
            </div>
        </div>
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
                    onChange={e => {refine(e.target.value)}}
                    onKeyDown={e => handleSetSearch(e, currentRefinement)}
                    className="ais-SearchBox-input"
                />
            </form>
        </div>
    )
});

const CustomHits = connectHits(({hits, handleResultSearch}) => {
    return (
        <div className="ais-Hits"> 
            {hits.map(hit => (
                <div 
                    className="ais-Hits-item" 
                    onClick={() => handleResultSearch(hit.title)} 
                    key={hit.objectID}
                >
                    <div className="truncate">{hit.title}</div>
                </div>
            ))}
        </div> 
    )
});

const Results = connectStateResults(({ searchState, searchResults, children }) =>
    searchResults && searchResults.nbHits !== 0 ? (
      children
    ) : (
        <>
            {searchState.query ? null: null}
        </>
    )
);

export default withRouter(ComparisonSearch);
