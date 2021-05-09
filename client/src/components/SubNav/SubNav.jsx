// App
import React, { useContext, useState } from 'react';
import { AppContext } from "../Context/Context";
import { withRouter } from "react-router-dom";

// Components
import SearchModal from '../SearchModal/SearchModal';

// Images 
// import logo from './images/logo.png'

// // Algolia 
import algoliasearch from 'algoliasearch/lite';
import { Index, InstantSearch, Configure, connectStateResults, connectHits, connectSearchBox } from 'react-instantsearch-dom';

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

const SubNav = ({ history }) => {
    const [isOpen, setIsOpen] = useState(false);
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
                    window.location.replace(`/search?q=${sessionStorage.getItem("searchResult")}`);
                } else {
                    console.log('No session storage support')
                    
                    // Complete search with context
                    setSearch(value);
                    window.location.replace(`/search?q=${value}`);
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
                window.location.replace(`/search?q=${sessionStorage.getItem("searchResult")}`);
            } else {
                console.log('No session storage support')
                
                // Complete search with context
                setSearch(value);
                window.location.replace(`/search?q=${value}`)
            }
        } else {
            return
        }  
    }

    // Search Modal
    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () =>{
        setIsOpen(false);
    }

    return (
    <>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
                <div className="flex justify-start">
                    <a href='/'>
                        <img
                            className="h-8 w-auto sm:h-10"
                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                            alt="Glitzher Logo"
                        />
                    </a>
                </div>
                <div className="flex justify-center justify-end w-full ml-8" >
                    <div className="w-full flex flex-row h-14 pr-20 rounded-lg border-2 border-gray-300 text-gray-500 focus:outline-none">
                        <p className="text-gray-400 px-4 pt-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </p> 
                        <p className="mt-4 text-gray-500 font-base">Enter a product title...</p>
                    </div>
                </div>
                <p onClick={openModal}>CLICK</p>
                <SearchModal isOpen={isOpen} closeModal={closeModal} openModal={isOpen} />

                <div className="hidden">
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
                    <p className="truncate">{hit.title}</p>
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

export default withRouter(SubNav);


