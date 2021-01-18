import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Typography, Rate, Button } from 'antd';
import { CheckCircleTwoTone, TrophyTwoTone, CaretRightOutlined, CaretLeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

import SkeletonLoader from '../../components/SkeletonLoader/SkeletonLoader';

import './Homepage.css'

// import fire from './Images/SALE.png';
const { Paragraph, Text, Link  } = Typography;


const Homepage = () => {
    const [offset, setOffset] = useState(0);
    const [data, setData] = useState([]);
    const [perPage] = useState(60); // 60 is what amazon has (60 products per page)
    const [pageCount, setPageCount] = useState(0)

    useEffect(() => {
        const getData = async() => {
            const res = await axios.get(`/api?page=${offset}&limit=100&discounted=false`)
            const data = res.data;

            const sliceData = data.slice(offset, offset + perPage)
            setData(sliceData)
            setPageCount(Math.ceil(data.length / perPage))

            console.log(data)
        }
        getData()
    }, [offset, perPage])

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage + 1)
    };

    //TODO:

    // add a little fire icon next to a item discounted $5 or more

    // make it so when the api updates at 12pm every day, redis also caches it.
    // cahcing system is really needed. When trying to paginate with 300 obj it doesn't load
    // when clicking on new pagination tab, redirect to top of page.

    return (
        <>
            {data ?
                <Row justiy="center" align="center">
                    {data.map((item, index) => {        
                        return (
                            <Row style={{textAlign: 'center', padding: '20px'}} key={index} gutter={16}>
                                <Col style={{width: '400px'}}> 
                                {/* style={{border: item.price.savings_percent >= 30 ? '3px solid red' : null}} */}
                                    <Card>
                                        {/* Product Image */}
                                        <a target="_blank" rel="noopener noreferrer" href={item.url}>
                                            <img
                                                src={item.thumbnail}
                                                alt={item.asin + 'amazon image'} 
                                                style={{width: '200px', height: '200px', objectFit: 'scale-down'}}
                                            />
                                        </a>
                                         <div className="example">
                                        
                                        </div>

                                        {/* Product title */}
                                        <a target="_blank" rel="noopener noreferrer" href={item.url}>
                                            <Row style={{marginTop: "15px", marginBottom: '6px'}}>
                                                <Paragraph style={{textAlign: 'left', fontSize: '16px', marginBottom: 0}}>
                                                    {item.title}
                                                </Paragraph>
                                            </Row>
                                        </a>

                                        {/* Product reviews */}
                                        <Row>
                                            <Rate disabled allowHalf defaultValue={item.reviews.rating} style={{fontSize: '18px'}} />
                                            <Link target="_blank" rel="noopener noreferrer" href={item.url + '/#customerReviews'} style={{margin: "6px 0 0 13px"}}>
                                                {item.reviews.total_reviews.toLocaleString()} Reviews
                                            </Link>
                                        </Row>

                                        {/* Product price */}
                                        <Row> 
                                            <Text style={{marginTop: '6px', marginBottom: 0, fontSize: '25px'}}>
                                                ${item.price.current_price}
                                            </Text>
                                            {item.price.savings_percent ? 
                                            <Row>
                                                <Text style={{fontSize: '16px', marginTop: '15px', marginLeft: '10px'}}>
                                                    {Math.ceil(item.price.savings_percent)}% off
                                                </Text>
                                            </Row>
                                            : null}    
                                        </Row>

                                        {/* Product extra */}
                                        <Row>
                                            {item.bestSeller ? 
                                                <Row style={{marginTop: '6px'}}> 
                                                    <TrophyTwoTone twoToneColor="#cf1322" style={{fontSize: '20px'}} /> 
                                                    <Text style={{marginLeft: '6px'}}>
                                                        Best Seller
                                                    </Text>
                                                </Row>     
                                            : null}
                                            {item.amazonPrime ?                          
                                                <Row style={{marginTop: '6px'}}> 
                                                    <CheckCircleTwoTone twoToneColor="#cf1322" style={{fontSize: '20px'}} /> 
                                                    <Text style={{marginLeft: '6px'}}>
                                                        Fast Shipping
                                                    </Text>
                                                </Row>     
                                            : null}
                                        </Row>

                                        {/* Add to cart */}
                                        <Row style={{ marginTop: '15px' }}>
                                            <Button 
                                                type="primary" 
                                                shape="round" 
                                                size="medium" 
                                                ghost 
                                            >
                                                Add to cart
                                            </Button>
                                        </Row>   
                                    </Card>
                                </Col>
                            </Row>
                        )
                    })}
                </Row>
                : <SkeletonLoader /> 
            }  
            <Row justiy="center" align="center" style={{margin: '2rem 0'}}>
                <ReactPaginate
                    previousLabel={<CaretLeftOutlined />}
                    nextLabel={<CaretRightOutlined /> }
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                />
            </Row> 
        </>   
    )
}

export default Homepage;