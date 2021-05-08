// App
import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from "react-router-dom";
import { AppContext } from "../../components/Context/Context";

// Application Packages
import axios from 'axios';
import LazyLoad from 'react-lazyload';
import InfiniteScroll from 'react-infinite-scroll-component';

// Components 
import SkeletonLoader from '../../components/SkeletonLoaders/SkeletonLoader';
// import SearchBar from '../../components/ComparisonSearch/ComparisonSearch';

// import './Homepage.css'


const Homepage = ({ history }) => {
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState('')
    const [hasMore, setHasMore] = useState(true)
    const { setSearch } = useContext(AppContext);


    const getData = async(page) => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        
        axios.get(`/api/homepage?page=${page}&limit=10`, { cancelToken: source.token })
        .then(res => {
            setProducts(prevProducts => {
                return [...new Set([...prevProducts, ...res.data])]
            })
            setHasMore(res.data.length > 0)
        }).catch(e => {
            if (axios.isCancel(e)) return 
        })
    }

    useEffect(() => {
        getData(page)
    }, [page])

    const handlePagination = () => {
        setPage(page + 1)
    }

    const comparePriceSearch = (value) => {
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
                // Complete search with context
                setSearch(value)
                history.push({
                    pathname: '/search',
                    search: `?q=${setSearch}`
                })
            }
        } else {
            return
        }
    };

    return (<>
        {/* <SearchBar /> */}

        <h1>Popular cosmetic items</h1>
        <div className="max-w-7xl mx-auto px-4 sm:px-20 text-center">
            {products ?
                <InfiniteScroll
                    dataLength={products.length}
                    next={handlePagination}
                    hasMore={hasMore}
                    loader={<div>Loading...</div>}
                    endMessage={
                        <h1>
                            You're all caught up on the best discounts!
                        </h1>
                    }
                >
                <div className="grid grid-cols-1 px-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2">
                    {products.map((item, index) => {        
                        return (
                            <div className="flex flex-col h-4/4 text-center mt-5 mx-2 border-b-2 border-gray-100" key={index}>
                                {/* Thumbnail */}
                                {item.thumbnail || item.subThumbnail ?
                                    <LazyLoad height={200} offset={400}>
                                        <a target="_blank" rel="noopener noreferrer" href={item.url}>
                                            <img className="inline" src={item.thumbnail} 
                                                alt={item.title} 
                                                style={{width: '200px', height: '200px', objectFit: 'scale-down'}}
                                            />
                                        </a>
                                    </LazyLoad>
                                    : 
                                    <div className="bg-gray-200 w-72 h-72"></div>
                                }

                                {/* Product Title */}
                                <div className="mt-2 text-left">
                                    <a target="_blank" rel="noopener noreferrer" href={item.url}>
                                        <div className="flex flex-wrap font-medium line-clamp-1">
                                            {item.title}
                                        </div>
                                    </a>
                                </div>

                                {/* Product Reviews */}
                                <div className="mt-2 text-left">
                                    {item.reviews.rating !== '' ? 
                                        <div className="flex items-center">
                                            {Array.from(Array(Math.round(item.reviews.rating))).map((x, i) => 
                                                <svg key={i} className="mr-1 w-4 fill-current text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                                            )}
                                            {Array.from(Array(5 - Math.round(item.reviews.rating))).map((x, i) => 
                                                <svg key={i} className="mr-1 w-4 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                                            )}
                                        </div>
                                        :
                                        <div className="flex items-center">
                                            <svg className="mx-1 w-4 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                                            <svg className="mx-1 w-4 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                                            <svg className="mx-1 w-4 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                                            <svg className="mx-1 w-4 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                                            <svg className="mx-1 w-4 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                                        </div>
                                    }
                                </div>

                                {/* Product Price */}
                                <div className="mt-2 text-left text-2xl"> 
                                    {item.price.current_price ? '$' + item.price.current_price : 'Unavailable'}
                                </div>
                                
                                {/* Compare Product */}
                                <div className="mt-2 text-sm truncate cursor-pointer">
                                    <div onClick={(() => comparePriceSearch(item.title))}>
                                        <p className="text-left">Compare prices on this product</p>
                                    </div>
                                </div>
                                
                                {/* Buy Button */}
                                <a href={item.url} target="_blank" rel="noopener noreferrer">
                                    <div className="mt-2 mb-6 bg-red-200 w-4/4 px-4 py-2 rounded-md shadow-sm text-base font-medium text-white bg-red-500 hover:bg-red-600">
                                        <div className="flex flex-row justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                                            </svg>
                                            <p>Buy Now</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        )
                    })}
                </div>    
                </InfiniteScroll> 
                :
                <SkeletonLoader /> 
            }
        </div>
    </>)
}


export default React.memo(withRouter(Homepage));