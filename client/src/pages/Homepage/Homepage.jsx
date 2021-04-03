// App
import React, { useState, useEffect, useContext, useCallback, Component, createRef } from 'react';
import { withRouter } from "react-router-dom";
import { AppContext } from "../../components/Context/Context";

// AntD
import { 
    Card, 
    Col, 
    Row, 
    Typography, 
    Rate, 
    Button, 
    Image,
    Select  
} from 'antd';
import { ShoppingOutlined, CaretRightOutlined, CaretLeftOutlined } from '@ant-design/icons';

// Application Packages
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import LazyLoad from 'react-lazyload';
import { FixedSizeList as List } from 'react-window'
import { ReactWindowScroller } from 'react-window-scroller'


// Components 
import SkeletonLoader from '../../components/SkeletonLoaders/SkeletonLoader';
import NavBar from '../../components/NavBar/NavBar';
import SearchBar from '../../components/ComparisonSearch/ComparisonSearch';

import './Homepage.css'

const { Paragraph, Text, Link, Title } = Typography;
const { Option } = Select;


const Homepage = ({history}) => {
    const [page, setPageNumber] = useState(1);
    const [perPage, setPerPage] = useState(50); 
    const [pageCount, setPageCount] = useState(0)
    const [data, setData] = useState('')
    const { setSearch } = useContext(AppContext);


    const getData = useCallback(async() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        try {      
            axios.get(`/api?page=${page}`, { cancelToken: source.token })
            .then(res => {
                // Response
                const data = res.data
                // Add Pages
                const startIndex = (page - 1) * perPage;
                const endIndex = page * perPage;
                const dataResult = data.slice(startIndex, endIndex);

                // Set Data
                setData(dataResult)
                setPageCount(Math.ceil(data.length / perPage))
                
            });
        } catch (err) {
            if (axios.isCancel(err)) {
                console.log("cancelled");
            } else {
                console.error(err)
            }
        }
    }, [page, perPage])

    useEffect(() => {
        getData()
    }, [getData])

    const handlePagination = (e) => {
        const selectedPage = e.selected;
        setPageNumber(selectedPage + 1)
        getData()
    }

    const handleItemsPerPage = (value) => {
        setPerPage(Number(value))
        getData()
    }

    const comparePriceSearch = (value) => {
        if (value !== '') {
            if (typeof(Storage) !== "undefined") {
                sessionStorage.removeItem('searchResult');
                sessionStorage.setItem("searchResult", value);

                console.log(value)
                // Complete search  
                history.push({
                    pathname: '/search',
                    search: `?q=${sessionStorage.getItem("searchResult")}`
                })
            } else {
                console.log('No session storage support')

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
    // 370 x 460
    return (
        <>
            <div>
                {/* Section 1 */}
                <SearchBar />
                <Title level={3} style={{textAlign: 'center', marginBottom: '4%'}}>View todays top discounts</Title>

                {/* Responsive Product List  */}
                <Row style={{textAlign: 'center', margin: '0 3%'}}>
                    <Col justify="center" align="center" className="homepageContainer">
                         {data ?
                            <Row justify="center" align="center">
                                <ReactWindowScroller>
                                    {({ ref, outerRef, style, onScroll }) => (
                                        <List
                                            ref={ref}
                                            outerRef={outerRef}
                                            style={style}
                                            onScroll={onScroll}
                                            height={window.innerHeight}
                                            itemCount={data.length}
                                            itemSize={300} 

                                            itemData={data}
                                            // columnCount={3}
                                            // columnWidth={300}                          
                                            // rowCount={data.length}
                                            // rowHeight={460}
                                            // width={window.innerWidth}
                                            // height={window.innerHeight}
                                        >
                                            {/* {ProductRow} */}
                                            {Cell}
                                        </List>
                                    )}
                                </ReactWindowScroller>
                            </Row>
                            : 
                            <SkeletonLoader /> 
                        }

                        {/* Pagination  */}
                        {data ? 
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
                                    <Row justify="right" align="right" style={{margin: 'auto 0'}}>
                                        <Row style={{margin: 'auto 15px'}} className="itemsperText">
                                            <Text>Items per page:</Text>
                                        </Row>
                                        <Select 
                                            defaultValue="50" 
                                            style={{ width: 80 }} 
                                            onChange={handleItemsPerPage}
                                            >
                                            <Option value="50">50</Option>
                                            <Option value="100">100</Option>
                                            <Option value="200">200</Option>
                                        </Select>
                                    </Row>
                                </Row> 
                            </>
                        : null} 
                    </Col>
                </Row>
            </div>
        </>
    );
}
const Cell = ({ index, style, data }) => {
    const product = data[index];
    return (
        <div style={style}>
            {product.title}
        </div>
    )
};

const ProductRow = ({ index, style, data }) => {
  const product = data[index];
  // style is passed by the List component to give our Row the correct dimensions
    console.log(data)
  return (  
    <div style={style} key={index}>
        <Row style={{textAlign: 'center', padding: '0 20px', margin: '10px 0'}} key={index} gutter={0}>
             <Col className="productColWrapper"> 
                 <Card style={{ borderTop: '2px solid #f0f0f0', borderBottom: '0px', borderRight: '0px', borderLeft: '0px'}}>
                     {/* Product Image */}
                     {product.thumbnail || product.subThumbnail ?
                        <> 
                        {product.thumbnail ?
                            <LazyLoad height={200} offset={400}>
                                <a target="_blank" rel="noopener noreferrer" href={product.url}>
                                    <img src={product.thumbnail} 
                                        alt={product.title} 
                                        style={{width: '200px', height: '200px', objectFit: 'scale-down'}}
                                    />
                                </a>
                            </LazyLoad>
                            :
                            <LazyLoad height={200} offset={400}>
                                <a target="_blank" rel="noopener noreferrer" href={product.url}>
                                    <img src={product.subThumbnail} 
                                        alt={product.title} 
                                        style={{width: '200px', height: '200px', objectFit: 'scale-down'}}
                                    />
                                </a>
                            </LazyLoad>
                        }
                        </>
                        : 
                        <Image
                            width={300}
                            height={300}
                            src="error"
                            fallback="data:image/png;base64,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"
                        />
                    }

                    {/* Product title */}
                    <a target="_blank" rel="noopener noreferrer" href={product.url}>
                        <Row className="hompageProductTitle" style={{marginTop: "15px", marginBottom: '6px'}}>
                            <Paragraph ellipsis={{ rows: 1 }} style={{textAlign: 'left', fontSize: '16px', marginBottom: 0}}>
                                {product.title}
                            </Paragraph>
                        </Row>
                    </a>

                    {/* Product reviews */}
                    <Row className="hompageProductReviews">
                        {product.reviews.rating !== '' ? 
                            <Rate disabled allowHalf defaultValue={product.reviews.rating} style={{fontSize: '14px'}} />
                            :
                            <Rate disabled allowHalf defaultValue={0} style={{fontSize: '14px'}} />
                        }
                    </Row>

                    {/* Product price */}
                    <Row className="hompageProductPrice"> 
                        <Text style={{marginTop: '6px', marginBottom: 0, fontSize: '25px'}}>
                            {product.price.current_price ? '$' + product.price.current_price : 'Unavailable'}
                        </Text>
                        {product.price.savings_percent ? 
                        <Row>
                            <Text delete style={{ marginTop: '17px', marginLeft: '10px'}}>
                                ${product.price.before_price}
                            </Text>
                            <Text strong style={{color: '#ff4d4f', fontSize: '16px', marginTop: '14px', marginLeft: '5px'}}>
                                {Math.ceil(product.price.savings_percent)}% OFF
                            </Text>
                        </Row>
                        : null}    
                    </Row>

                    {/* Compare Prices */}        
                    <Row className="hompageProductCompare">
                        {/* <Link onClick={(() => comparePriceSearch(data.title))} target="_blank" style={{color: '#000000d9'}}>
                            Compare prices on this product
                        </Link> */}
                    </Row>

                    {/* Add to cart */}
                    <a target="_blank" rel="noopener noreferrer" href={product.url}>
                        <Row style={{margin:'15px 0'}} className="hompageProductBuy">
                            <Button 
                                className="homepageProductButton"
                                type="primary" 
                                size='medium' 
                            >
                                <ShoppingOutlined style={{ fontSize: '17px', color: '#fff' }}/> Buy Now
                            </Button>
                        </Row>   
                    </a>
                </Card>
            </Col>
        </Row>
    </div>
  );
};

 


export default withRouter(Homepage);
// export default Homepage
