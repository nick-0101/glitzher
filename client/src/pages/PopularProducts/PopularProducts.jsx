// App
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { AppContext } from "../../components/Context/Context";
import { useHistory  } from 'react-router-dom';

// Application Packages
import axios from 'axios';
import LazyLoad from 'react-lazyload';
import { ShoppingBagIcon, ArrowRightIcon } from '@heroicons/react/outline'
import { Helmet } from "react-helmet";

// Components 
import SkeletonLoader from '../../components/SkeletonLoaders/SkeletonLoader';

const PopularProducts = () => {
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState('')
    const { setSearch } = useContext(AppContext);
    
    // Filter State
    const [sortData, setSortData] = useState('popular')
    
    let history = useHistory();

    // Fetch Api Data
    const getData = useCallback(async() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        
        axios.get(`/api/homepage?page=${page}&limit=10&sortBy=${sortData}`, 
        { cancelToken: source.token })
        .then(res => {
            setProducts(prevProducts => {
                return [...new Set([...prevProducts, ...res.data])]
            })   
        }).catch(e => {
            if (axios.isCancel(e)) return 
        })
        return () => {
            source.cancel();
        };
    }, [page, sortData])
    
    // Sort Products
    const sortProducts = (value) => {
        setSortData(value)
        setProducts('')
        setPage(1)

        console.log(sortData)
    }

    // Scroll to top on load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    // Inital Fetch Data
    useEffect(() => {
        getData(page, sortData)

    }, [page, getData, sortData])

    // Handle Pagination / Infinite scroll
    const handlePagination = () => {
        setPage(page + 1)
    }

    // Search on click
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

    return (
        <>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Popular Products - Glitzher</title>
            <meta name="description" content="Most popular Canadian beauty products." />
        </Helmet>
        <div className="max-w-7xl mx-auto px-4 sm:px-20">
            <div className="flex flex-wrap my-10 justify-center md:justify-between">
                <div className="flex flex-col md:flex-row text-2xl font-medium">
                    Popular cosmetic items
                    <div className="text-gray-500 ml-2 text-center">
                    - 8,033 Items
                    </div>
                </div>

                <div className="flex text-base font-medium">
                    <div className="my-auto">Sort: </div>
                    <div className="flex flex-row divide-x-2 divide-gray-200 my-auto">
                        <div onClick={() => sortProducts('popular')} className={sortData === 'popular' ? "px-2 text-red-500 cursor-pointer hover:underline" : "px-2 text-gray-500 cursor-pointer hover:underline"}>
                            Popular
                        </div>
                        <div className="px-2 flex flex-row">
                            <div className="px-2">Price: </div>
                            <div onClick={() => sortProducts('low')} className={sortData === 'low' ? "px-0.5 text-red-500 cursor-pointer hover:underline" : "px-0.5 text-gray-500 cursor-pointer hover:underline"}>
                                Low
                            </div>
                            <div onClick={() => sortProducts('high')} className={sortData === 'high' ? "px-0.5 text-red-500 cursor-pointer hover:underline" : "px-0.5 text-gray-500 cursor-pointer hover:underline"}>
                                High
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="border-b-2 border-gray-100"></div>

            {products ?
                <div className="grid grid-cols-1 px-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 mt-8">
                    {products.map((item, index) => {        
                        return (
                            <div className="flex flex-col h-4/4 text-center mt-5 px-3 pb-5 border-b-2 border-gray-100" key={index}>
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
                                    <div className="mt-2 bg-red-200 w-auto px-4 py-2 rounded-md shadow-sm text-base font-medium text-white bg-red-500 hover:bg-red-600 transition duration-300 ease-in-out">
                                        <div className="flex flex-row justify-center">
                                            <div className="flex flex-wrap text-base font-medium text-white px-8 py-1.5 rounded-md justify-center">
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
            <div className="mt-9 w-1/3 mx-auto" onClick={handlePagination}>
                <div className="flex transition duration-300 ease-in-out text-red-600 bg-red-100 hover:bg-red-200 font-medium px-7 py-3.5 rounded-md justify-center">
                    <ArrowRightIcon className="h-6 w-6 text-red-500" aria-hidden="true" /> 
                    <span className="ml-2">View More</span>
                </div>
            </div>
        </div>
        </>
    );
}

export default PopularProducts;
