// App
import React, { useState, useEffect, useContext } from 'react';
import { withRouter, Link } from "react-router-dom";
import { AppContext } from "../../components/Context/Context";

// Application Packages
import axios from 'axios';
import LazyLoad from 'react-lazyload';
import { ShoppingBagIcon, ArrowRightIcon } from '@heroicons/react/outline'

// Components 
import SkeletonLoader from '../../components/SkeletonLoaders/SkeletonLoader';
import SearchBar from '../../components/ComparisonSearch/ComparisonSearch';

const Homepage = ({ history }) => {
    const [products, setProducts] = useState('')
    const { setSearch } = useContext(AppContext);


    const getData = async() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        
        axios.get(`/api/homepage?page=1&limit=8`, { cancelToken: source.token })
        .then(res => {
            setProducts(res.data)
        }).catch(e => {
            if (axios.isCancel(e)) return 
        })
    }

    useEffect(() => {
        getData()
    }, [])

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
        <SearchBar />
        <div className="text-center text-2xl font-medium mx-auto my-10">
            Popular cosmetic items
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-20 text-center" id="#popular-products">
            {products ?
                <div className="grid grid-cols-1 px-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2">
                    {products.map((item, index) => {        
                        return (
                            <div className="flex flex-col h-4/4 text-center mx-3 pt-6 border-t-2 border-gray-100" key={index}>
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

                                <div className="mt-2 text-left">
                                    <a target="_blank" rel="noopener noreferrer" href={item.url}>
                                        <div className="flex flex-wrap font-medium line-clamp-1">
                                            {item.title}
                                        </div>
                                    </a>
                                </div>

                                <div className="mt-2 text-left">
                                    {item.reviews.rating !== '' ? 
                                        <div className="flex items-center">
                                            {Array.from(Array(Math.round(item.reviews.rating))).map((x, i) => 
                                                <svg key={i} className="mr-1 w-4 fill-current text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                                            )}
                                            {Array.from(Array(5 - Math.round(item.reviews.rating))).map((x, i) => 
                                                <svg key={i} className="mr-1 w-4 fill-current text-gray-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                                            )}
                                        </div>
                                        :
                                        <div className="flex items-center">
                                            <svg className="mx-1 w-4 fill-current text-gray-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                                            <svg className="mx-1 w-4 fill-current text-gray-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                                            <svg className="mx-1 w-4 fill-current text-gray-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                                            <svg className="mx-1 w-4 fill-current text-gray-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                                            <svg className="mx-1 w-4 fill-current text-gray-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                                        </div>
                                    }
                                </div>

                                <div className="mt-2 text-left text-2xl"> 
                                    {item.price.current_price ? '$' + item.price.current_price : 'Unavailable'}
                                </div>
                                
                                <div className="mt-2 text-sm truncate cursor-pointer">
                                    <div onClick={(() => comparePriceSearch(item.title))}>
                                        <p className="text-left">Compare prices on this product</p>
                                    </div>
                                </div>
                                
                                <a href={item.url} target="_blank" rel="noopener noreferrer">
                                    <div className="mt-2 bg-red-200 w-4/4 px-4 py-2 rounded-md shadow-sm text-base font-medium text-white bg-red-500 hover:bg-red-600 transition duration-300 ease-in-out">
                                        <div className="flex flex-row justify-center">
                                            <div className="flex text-base flex-wrap font-medium text-white px-8 py-1.5 rounded-md justify-center md:mr-2 md:mb-0">
                                                    <ShoppingBagIcon className="h-6 w-6 text-white" aria-hidden="true" /> 
                                                    <span className="ml-2">Shop Now</span>
                                                </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        )
                    })}
                </div>    
                :
                <SkeletonLoader /> 
            }

            <div className="mt-9 w-1/3 mx-auto">
                <Link to='/popular-products'>
                    <div className="flex transition duration-300 ease-in-out text-red-600 bg-red-100 hover:bg-red-200 font-medium px-7 py-3.5 rounded-md justify-center">
                        <ArrowRightIcon className="h-6 w-6 text-red-500" aria-hidden="true" /> 
                        <span className="ml-2">View More</span>
                    </div>
                </Link>
            </div>
        </div>
            
    </>)
}


export default React.memo(withRouter(Homepage));