// Required
// import React, { useContext } from 'react';

// import { AppContext } from "../Context/Context";
// import { withRouter } from "react-router-dom";

// // Ant D 
// import { Row, Col, Typography, Layout } from 'antd';

// // Css
// import './SubNav.css'

// // Images 
// import logo from './images/logo.png'

// // Algolia 
// import algoliasearch from 'algoliasearch/lite';
// import { Index, InstantSearch, Configure, connectStateResults, connectHits, connectSearchBox } from 'react-instantsearch-dom';

// //#23263b
// const algoliaClient = algoliasearch('GRXWQQHS2I', 'babd585148a07355c43a354cc0aece0f');

// const searchClient = {
//   search(requests) {
//     if (requests.every(({ params }) => !params.query)) {
//       return Promise.resolve({
//         results: requests.map(() => ({
//           hits: [],
//           nbHits: 0,
//           nbPages: 0,
//           processingTimeMS: 0,
//         })),
//       });
//     }

//     return algoliaClient.search(requests);
//   },
// };

// const { Text } = Typography;
// const { Header } = Layout;

// const SubNav = ({ history }) => {
//     const { setSearch } = useContext(AppContext);

//     const handleSetSearch = (e, searchValue) => {
//         const value = searchValue;

//         if(e.keyCode === 13){
//             e.preventDefault(); 

//             if (value !== '') {
//                 if (typeof(Storage) !== "undefined") {
//                     sessionStorage.removeItem('searchResult');
//                     sessionStorage.setItem("searchResult", value);

//                     // Complete search
//                     window.location.replace(`/search?q=${sessionStorage.getItem("searchResult")}`);
//                 } else {
//                     console.log('No session storage support')
                    
//                     // Complete search with context
//                     setSearch(value);
//                     window.location.replace(`/search?q=${value}`);
//                 }
//             } else {
//                 return
//             }  
//         } 
//     };

//     const handleResultSearch = (suggestionValue) => {
//         const value = suggestionValue

//         if (value !== '') {
//             if (typeof(Storage) !== "undefined") {
//                 sessionStorage.removeItem('searchResult');
//                 sessionStorage.setItem("searchResult", value);

//                 // Complete search
//                 window.location.replace(`/search?q=${sessionStorage.getItem("searchResult")}`);
//             } else {
//                 console.log('No session storage support')
                
//                 // Complete search with context
//                 setSearch(value);
//                 window.location.replace(`/search?q=${value}`)
//             }
//         } else {
//             return
//         }  
//     }

//     return (
//     <>
//          <Layout theme='light'>
//              <Header theme='light' className="subMenuHeader" style={{ background: '#fff' }} >
//                 <Row>
//                     <a href='/'>
//                     <img className='subLogo' src={logo} alt='Glitzher logo'/>
//                 </a>
//                 </Row>
//                 <InstantSearch indexName="amazonProducts" searchClient={searchClient}>
//                     <Col className="subSearchBar" style={{zIndex: 1, marginTop: '0.3rem'}}>
//                         <CustomSearch handleSetSearch={handleSetSearch} />

//                         <Index indexName="amazonProducts">
//                             <Configure hitsPerPage={1} />
//                             <Results>
//                                 <CustomHits history={history} handleResultSearch={handleResultSearch}/>
//                             </Results>
//                         </Index>

//                         <Index indexName="sephoraProducts">
//                             <Configure hitsPerPage={2} />
//                             <Results>
//                                 <CustomHits history={history} handleResultSearch={handleResultSearch}/>
//                             </Results>
//                         </Index>

//                         <Index indexName="shoppersdrugmartProducts">
//                             <Configure hitsPerPage={2} />
//                             <Results>
//                                 <CustomHits history={history} handleResultSearch={handleResultSearch}/>
//                             </Results>
//                         </Index>
//                     </Col>
//                 </InstantSearch>
//             </Header>
//          </Layout>

//     </>
//     );
// }

// const CustomSearch = connectSearchBox(({currentRefinement, refine, handleSetSearch}) => {
//     return (
//         <div className="ais-SearchBox">
//             <form className="ais-SearchBox-form">
//                 <input
//                     type="search"
//                     placeholder="Enter a product title..."
//                     autoComplete="on"
//                     autoCorrect="on"
//                     spellCheck="true"
//                     required
//                     value={currentRefinement}
//                     onChange={e => {refine(e.target.value)}}
//                     onKeyDown={e => handleSetSearch(e, currentRefinement)}
//                     className="ais-SearchBox-input"
//                 />
//             </form>
//         </div>
//     )
// });

// const CustomHits = connectHits(({hits, handleResultSearch}) => {
//     return (
//         <Col className="ais-Hits"> 
//             {hits.map(hit => (
//                 <Row 
//                     className="ais-Hits-item" 
//                     onClick={() => handleResultSearch(hit.title)} 
//                     key={hit.objectID}
//                 >
//                     <Text ellipsis={true}>{hit.title}</Text>
//                 </Row>
//             ))}
//         </Col> 
//     )
// });

// const Results = connectStateResults(({ searchState, searchResults, children }) =>
//     searchResults && searchResults.nbHits !== 0 ? (
//       children
//     ) : (
//         <>
//             {searchState.query ? null: null}
//         </>
//     )
// );

// export default withRouter(SubNav);


