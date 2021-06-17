// App 
import React, { useEffect, useState, useCallback, Fragment } from 'react';
import { Link } from "react-router-dom";

// Application Packages 
import axios from 'axios';
import { ShoppingBagIcon, SwitchHorizontalIcon } from '@heroicons/react/outline'
import { Helmet } from "react-helmet";

// Components
import SkeletonLoader from '../../components/SkeletonLoaders/ComparisonSkeleton';

// Image
import notFound from './images/search_not_found.webp';


const PriceComparison = () => {
    const [comparisonData, setComparisonData] = useState(null)
    const [tableData, setTableData] = useState(null)
    
    // Pagination 
    const [page] = useState(1);
    const [perPage] = useState(5); 

    // Errors
    const [errorTitle, setErrorTitle] = useState(null)
    const [errorDesc, setErrorDesc] = useState(null)

    const searchProducts = useCallback(async() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        const searchValue = sessionStorage.getItem("searchResult");

        axios.get(`/api/search?q=${searchValue}`, 
        { cancelToken: source.token })
        .then(res => {            
            const data = res.data;

            // Add Pages
            const startIndex = (page - 1) * perPage;
            const endIndex = page * perPage;
            const dataResult = data.slice(startIndex, endIndex);

            // Set Data
            setComparisonData(dataResult)

            // Set & format table data
            const formattedTableData = dataResult.map((item, index) => ({
                key: index,
                brand: item.brand,
                thumbnail: item.thumbnail || item.subThumbnail || null,
                title: item.title,
                price:{ current_price: item.price.current_price },
                url: item.url
            }))
            
            setTableData(formattedTableData)        
            console.log(formattedTableData)
        }).catch((err) => {
            if (axios.isCancel(err)) return 
            setErrorTitle(err.response.data.title)
            setErrorDesc(err.response.data.desc + ' Make sure your search is descriptive and contains no major spelling mistakes.')
        });
    }, [page, perPage])


    useEffect(() => { 
        searchProducts()
    }, [searchProducts]);

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Search - Glitzher</title>
                <meta name="description" content="Search for the best price on a Canadian cosmetic product." />
            </Helmet>
            {/* Product Not Found */}
            {errorTitle && errorDesc ? 
                <div className="max-w-5xl mx-auto px-4 sm:px-20">
                    <div className="flex flex-col text-center">
                        <div className="mx-auto">
                            <img src={notFound} width={350} height={350} alt='product not found'/>
                        </div>
                        <div className="text-6xl font-bold text-gray-900 my-3">
                            {errorTitle}
                        </div>
                        <div className="mx-10 md:mx-40 my-2 text-lg text-gray-500">
                            {errorDesc}
                        </div>
                        <Link to="/">
                            <div className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-500 hover:bg-red-600">
                                Return Home
                            </div>
                        </Link>
                    </div>    
                </div>
                : 
                <>
                    {comparisonData && tableData ?
                        <>  
                            <div className="max-w-5xl mx-auto px-4 sm:px-20">
                                <div className="w-full mt-6 mb-8 text-center md:text-left">
                                    <div className="text-2xl font-medium text-gray-900">{comparisonData[0].title}</div>
                                </div>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 gap-4">
                                    {/* Thumbnail */}
                                    {comparisonData[0].thumbnail || comparisonData[0].subThumbnail ?
                                        <> 
                                            {comparisonData[0].thumbnail ?
                                                <a target="_blank" rel="noopener noreferrer" href={comparisonData[0].url}>
                                                    <img 
                                                        className="object-scale-down w-full h-72" 
                                                        src={comparisonData[0].thumbnail}
                                                        alt={comparisonData[0].title} 
                                                    />
                                                </a>
                                                :
                                                <a target="_blank" rel="noopener noreferrer" href={comparisonData[0].url}>
                                                    <img 
                                                        className="object-scale-down w-full h-72" 
                                                        src={comparisonData[0].subThumbnail}
                                                        alt={comparisonData[0].title} 
                                                    />
                                                </a>
                                            }
                                        </>
                                        : 
                                        <div className="bg-gray-200 h-80 rounded"></div>
                                    }
                                    <div className="justify-center md:justify-left">
                                        {/* Brand */}
                                        <div className="text-center md:text-left">
                                            {comparisonData[0].brand ? 
                                                <div className="text-base text-gray-900">
                                                    The best price by <span className="text-red-500 font-medium cursor-pointer">{comparisonData[0].brand}</span>
                                                </div>     
                                            :   <div className="text-base font-medium text-gray-900">
                                                    This is the best price we found.
                                                </div>
                                            }

                                            {/* Price */}
                                            {comparisonData[0].price.current_price ? 
                                                <div className="text-2xl font-medium text-gray-900">
                                                    {'$' + comparisonData[0].price.current_price}    
                                                </div> 
                                                :
                                                <div className="text-base font-medium text-gray-900">
                                                    $0.00
                                                </div>
                                            }
                                        </div>
                                        
                                        {/* Divider */}
                                        <div className="border-b my-4"></div>

                                        {/* Rating */}
                                        <div className="flex justify-center md:flex md:justify-start">
                                            {comparisonData[0].reviews.rating ? 
                                                <>
                                                    <div className="mr-3">{comparisonData[0].reviews.rating} / 5</div>
                                                    {Array.from(Array(Math.round(parseInt(comparisonData[0].reviews.rating)))).map((x, i) => 
                                                        <svg key={i} className="mr-1 w-4 fill-current text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                                                    )}
                                                    {Array.from(Array(5 - Math.round(parseInt(comparisonData[0].reviews.rating)))).map((x, i) => 
                                                        <svg key={i} className="mr-1 w-4 fill-current text-gray-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                                                    )}
                                                </>
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
                                        
                                        {/* Divider */}
                                        <div className="border-b my-4"></div>
                                        
                                        {/* Button Group */}
                                        <div className="flex flex-wrap justify-center flex-col">
                                            <a target="_blank" rel="noopener noreferrer" href={comparisonData[0].url}>
                                                <div className="flex text-base font-medium text-white bg-red-500 hover:bg-red-600 px-8 py-3.5 rounded-md justify-center mb-2 transition duration-300 ease-in-out">
                                                    <ShoppingBagIcon className="h-6 w-6 text-white" aria-hidden="true" /> 
                                                    <span className="ml-2">Shop Now</span>
                                                </div>
                                            </a>
                                            <a href="#price-comparison">
                                                <div className="flex text-red-600 bg-red-100 hover:bg-red-200 font-medium px-7 py-3.5 rounded-md justify-center transition duration-300 ease-in-out">
                                                    <SwitchHorizontalIcon className="h-6 w-6 text-red-500" aria-hidden="true" /> 
                                                    <span className="ml-2">Compare Prices</span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="border-b my-4"></div>
                                
                                {/* Table Title */}
                                <div className="w-full mt-3 mb-5 text-center md:text-left">
                                    <div className="text-2xl font-medium text-gray-900 transition duration-300 ease-in-out">Compare prices</div>
                                </div>

                                {/* Price Comparison Table */}
                                <table className="hidden md:table md:min-w-full md:table-auto md:divide-y md:divide-gray-200" id="price-comparison">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                                            >
                                                Shop
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                                            >
                                                Image
                                            </th>
                                            <th
                                                scope="col"
                                                className="hidden md:block px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                                            >
                                                Product Details
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                                            >
                                                Price
                                            </th>
                                            <th scope="col" className="relative px-6 py-3">
                                                <span className="sr-only">Shop</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {tableData.map((product, i) => (
                                        <tr key={i} className={i === 0 ? 
                                            "border-2 border-red-200"
                                            :
                                            "border-0"
                                        }>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{product.brand}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                 <a href={product.url} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                                                    <img 
                                                        className="object-scale-down w-full h-28"  
                                                        src={product.thumbnail} 
                                                        alt={product.title}
                                                    />
                                                </a>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {i === 0 ? 
                                                    <div className="bg-red-100 w-20 rounded-md py-1 px-0.5 mb-2 text-center">
                                                        <div className="text-red-600 text-xs font-medium uppercase">Best Offer</div>
                                                    </div> 
                                                    : 
                                                    null
                                                }
                                                <a href={product.url} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                                                    {product.title}
                                                </a>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-900">
                                                {'$' + product.price.current_price}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <a href={product.url} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                                                    <div className="bg-red-500 hover:bg-red-600 rounded-md px-4 py-3 transition duration-300 ease-in-out">
                                                        <ShoppingBagIcon className="h-5 w-5 mx-auto text-white" aria-hidden="true" /> 
                                                    </div>
                                                </a>
                                            </td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            
                                {/* Table Responsive */}
                                <div className="flex flex-col min-w-full md:hidden" id="price-comparison">
                                    {tableData.map((product, i) => (
                                        <Fragment key={i}>
                                            <div className={i === 0 ? 
                                                'grid grid-cols-4 sm:grid-cols-3 sm:mb-3 p-2 border-2 border-red-200 rounded-md' 
                                                : 
                                                'grid grid-cols-4 sm:mb-3 p-2 sm:grid-cols-3' 
                                            }>
                                               <a href={product.url} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                                                    <img 
                                                        className="object-scale-down mx-2 sm:w-full sm:mx-0 h-28"  
                                                        src={product.thumbnail} 
                                                        alt={product.title}
                                                    />
                                                    <div className="text-sm font-medium text-gray-900 sm:text-center ml-2 mt-2">
                                                        {product.brand}
                                                    </div>
                                                </a>
                                                <div className="col-span-3 sm:col-span-2 my-auto">
                                                    <div className="flex-col grid grid-cols-3">
                                                        <div className="col-span-2">
                                                            {i === 0 ? 
                                                                <div className="bg-red-100 w-20 rounded-md py-1 px-0.5 mb-2 text-center">
                                                                    <div className="text-red-600 text-xs font-medium uppercase">Best Offer</div>
                                                                </div> 
                                                                : 
                                                                null
                                                            }
                                                            <a href={product.url} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                                                                <div className="mb-2 break-words text-sm text-gray-900">
                                                                     {product.title}
                                                                </div>
                                                            </a>
                                                            <div className="text-lg font-medium text-gray-900">
                                                                {'$' + product.price.current_price}
                                                            </div>
                                                        </div>
                                                        <div className="ml-auto my-auto">
                                                            <a href={product.url} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                                                                <div className="bg-red-500 hover:bg-red-600 rounded-md px-3 py-3 transition duration-300 ease-in-out">
                                                                    <ShoppingBagIcon className="h-5 w-5 mx-auto text-white" aria-hidden="true" /> 
                                                                </div>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Fragment>
                                   ))}
                                </div>
                            </div>
                        </>
                        :
                        <SkeletonLoader />
                    }
                </>
            }
        </>
    )
}

export default PriceComparison







