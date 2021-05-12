// App 
import React, { useEffect, useState, useCallback } from 'react';
import { Link } from "react-router-dom";

// Application Packages 
import axios from 'axios';
// import ReactPaginate from 'react-paginate';
import { ShoppingBagIcon, SwitchHorizontalIcon } from '@heroicons/react/outline'

// Components
import SkeletonLoader from '../../components/SkeletonLoaders/ComparisonSkeleton';

// Image
import notFound from './images/search_not_found.webp';


const PriceComparison = () => {
    const [comparisonData, setComparisonData] = useState(null)

    // Pagination 
    const [page, setPageNumber] = useState(1);
    const [perPage] = useState(5); 
    const [pageCount, setPageCount] = useState(0)

    // Errors
    const [errorTitle, setErrorTitle] = useState(null)
    const [errorDesc, setErrorDesc] = useState(null)

    // const searchProducts = useCallback(async() => {
    //     const CancelToken = axios.CancelToken;
    //     const source = CancelToken.source();

    //     const searchValue = sessionStorage.getItem("searchResult");

    //     axios.get(`/api/search?q=${searchValue}`, 
    //     { cancelToken: source.token })
    //     .then(res => {            
    //         const data = res.data;

    //         // Add Pages
    //         const startIndex = (page - 1) * perPage;
    //         const endIndex = page * perPage;
    //         const dataResult = data.slice(startIndex, endIndex);

    //         // Set Data
    //         setComparisonData(dataResult)
    //         setPageCount(Math.ceil(data.length / perPage))

    //         // Set & format table data
    //         const tabledData = dataResult.map((item, index) => ({
    //             key: index,
    //             merchant: item.brand,
    //             imageURL: item.thumbnail || item.subThumbnail || 'data:image/png;base64,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',
    //             details: item.title,
    //             price: item.price.current_price,
    //             shopButton: item.url
    //         }))
            
    //         setTableData(tabledData)        
    //     }).catch((err) => {
    //         if (axios.isCancel(err)) return 
    //         setErrorTitle(err.response.data.title)
    //         setErrorDesc(err.response.data.desc + ' Make sure your search is descriptive and contains no major spelling mistakes.')
    //     });
    // }, [page, perPage])

    // const handlePagination = (e) => {
    //     const selectedPage = e.selected;
    //     setPageNumber(selectedPage + 1)
    //     searchProducts()
    // }

    useEffect(() => { 
        // searchProducts()
        const mockData = [
            {
                brand: 'Amazon',
                thumbnail: 'https://m.media-amazon.com/images/I/51k-gPOv-gL._AC_UL320_SP_SAME_DOMAIN_ASSETS_257061_.jpg',
                title: 'Moroccanoil Treatment Hair Oil',
                price: {current_price : '50.00'},
                url: 'https://amazon.ca/Moroccanoil-Treatment-Hair-Type-Ounce/dp/B001AO0WCG/ref=sr_1_1?dchild=1&pg=1&qid=1618601921&s=luxury-beauty&sr=1-1',
                reviews: {total_reviews: '554', rating: "4"}
            },
            {
                brand: 'Walmart',
                thumbnail: 'https://m.media-amazon.com/images/I/51k-gPOv-gL._AC_UL320_SP_SAME_DOMAIN_ASSETS_257061_.jpg',
                title: 'Moroccanoil Treatment Hair Oil',
                price: {current_price : '60.00'},
                url: 'https://amazon.ca/Moroccanoil-Treatment-Hair-Type-Ounce/dp/B001AO0WCG/ref=sr_1_1?dchild=1&pg=1&qid=1618601921&s=luxury-beauty&sr=1-1',
                reviews: {total_reviews: '554', rating: "4"}
            },
        ];

        setComparisonData(mockData)
    }, []);

    console.log(comparisonData)

    return (
        <>
            <div className="max-w-5xl mx-auto px-4 sm:px-20">

                {/* Product Not Found */}
                {errorTitle && errorDesc ? 
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
                    : 
                    <>
                        {comparisonData ?
                            <>  
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
                                        <div className="flex justify-center flex-col md:flex md:justify-start md:flex-row">
                                            <a target="_blank" rel="noopener noreferrer" href={comparisonData[0].url}>
                                                <div className="flex text-base font-medium text-white bg-red-500 hover:bg-red-600 px-8 py-3.5 rounded-md justify-center mb-2 md:mr-2 md:mb-0">
                                                    <ShoppingBagIcon className="h-6 w-6 text-white" aria-hidden="true" /> 
                                                    <span className="ml-2">Shop Now</span>
                                                </div>
                                            </a>
                                            <div className="flex text-red-600 bg-red-100 hover:bg-red-200 font-medium px-7 py-3.5 rounded-md justify-center cursor-pointer">
                                                <SwitchHorizontalIcon className="h-6 w-6 text-red-500" aria-hidden="true" /> 
                                                <span className="ml-2">Compare Prices</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="border-b my-4"></div>
                                
                                {/* Table Title */}
                                <div className="w-full mt-6 mb-8 text-center md:text-left">
                                    <div className="text-2xl font-medium text-gray-900">Compare prices</div>
                                </div>

                                {/* Price Comparison Table */}
                                <table className="min-w-full table-auto divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Shop
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Image
                                            </th>
                                            <th
                                                scope="col"
                                                className="hidden md:block px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Product Details
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Price
                                            </th>
                                            <th scope="col" className="relative px-6 py-3">
                                                <span className="sr-only">Shop</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {comparisonData.map((product, i) => (
                                        <tr key={i}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{product.brand}</div>
                                                </div>
                                            </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <img 
                                                    className="object-scale-down w-full h-28"  
                                                    src={product.thumbnail} 
                                                    alt={product.title}
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {product.title}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {'$' + product.price.current_price}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="bg-red-500 hover:bg-red-600 rounded-md px-2 py-3">
                                                    <a href={product.url}>
                                                        <ShoppingBagIcon className="h-5 w-5 mx-auto text-white" aria-hidden="true" /> 
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </>
                            :
                            <SkeletonLoader />
                        }
                        {/* {comparisonData > 5 ? 
                            <>
                                <Row justify="center" align="center" style={{margin: '2rem 0'}}>
                                    <Row className="desktopPagination"> 
                                        <ReactPaginate
                                            previousLabel={<><CaretLeftOutlined /> Prev</>}
                                            nextLabel={<><CaretRightOutlined /> Next</>}
                                            breakLabel={"..."}
                                            breakClassName={"break-me"}
                                            pageCount={pageCount}
                                            onPageChange={handlePagination}
                                            containerClassName={"pagination"}
                                            subContainerClassName={"pages pagination"}
                                            activeClassName={"active"}
                                            onClick={window.scrollTo(0, 0)}
                                        />
                                    </Row>
                                    <Row className="mobilePagination">
                                        <ReactPaginate
                                            previousLabel={<><CaretLeftOutlined /> Prev</>}
                                            nextLabel={<><CaretRightOutlined /> Next</>}
                                            breakLabel={"..."}
                                            breakClassName={"break-me"}
                                            pageCount={pageCount}
                                            onPageChange={handlePagination}
                                            containerClassName={"pagination"}
                                            subContainerClassName={"pages pagination"}
                                            activeClassName={"active"}
                                            onClick={window.scrollTo(0, 0)}
                                        />
                                    </Row>
                                </Row> 
                            </>
                        : null}  */}
                    </>
                }
            </div>
        </>
    )
}

export default PriceComparison







