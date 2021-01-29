import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Typography, Rate, Button } from 'antd';
import { CheckCircleTwoTone, TrophyTwoTone, ShoppingCartOutlined, CaretRightOutlined, CaretLeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

// Components 
import SkeletonLoader from '../../components/SkeletonLoader/SkeletonLoader';
import SiderNav from '../../components/SiderNav/SiderNav';
import PriceComparison from '../../components/ComparisonSearch/ComparisonSearch';

import './Homepage.css'

const { Paragraph, Text, Link, Title } = Typography;

const Homepage = () => {
    const [offset, setOffset] = useState(0);
    const [data, setData] = useState('');
    const [perPage] = useState(10);
    const [pageCount, setPageCount] = useState(0)

    useEffect(() => {
        async function getData() {
            const res = await axios.get(`/api?page=${offset}&limit=100&discounted=true`)
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

    return (
        <>
        {/* Section 1 */}
        <PriceComparison />

        {/* Section 2 */}
        <Title level={3} style={{textAlign: 'center', marginBottom: '4%'}}>View todays top discounts</Title>
        <Row style={{textAlign: 'center', margin: '0 3%'}}>
            <Col xs={0} sm={0} md={0} lg={0} xl={2} xxl={4} style={{borderRight: '2px solid #f0f0f0'}}> 
               <SiderNav /> 
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={22} xxl={20} justiy="center" align="center">
            {data ?
                <Row justiy="center" align="center" style={{marginLeft: '20px'}}>
                    {data.map((item, index) => {        
                        return (
                            <Row style={{textAlign: 'center', padding: '0 10px'}} key={index} gutter={16}>
                                <Col style={{width: '400px', height: '460px'}}> 
                                    <Card style={{ borderTop: '2px solid #f0f0f0', borderBottom: '0px', borderRight: '0px', borderLeft: '0px'}}>
                                        {/* Product Image */}
                                        <a target="_blank" rel="noopener noreferrer" href={item.url}>
                                            <img
                                                src={item.thumbnail}
                                                alt={item.asin + 'image'} 
                                                style={{width: '200px', height: '200px', objectFit: 'scale-down'}}
                                            />
                                        </a>
                                         <div className="example">
                                        
                                        </div>

                                        {/* Product title */}
                                        <a target="_blank" rel="noopener noreferrer" href={item.url}>
                                            <Row style={{marginTop: "15px", marginBottom: '6px'}}>
                                                <Paragraph ellipsis={{ rows: 2 }} style={{textAlign: 'left', fontSize: '16px', marginBottom: 0}}>
                                                    {item.title}
                                                </Paragraph>
                                            </Row>
                                        </a>

                                        {/* Product reviews */}
                                        <Row>
                                            <Rate disabled allowHalf defaultValue={item.reviews.rating} style={{fontSize: '14px'}} />
                                            {/* <Link target="_blank" rel="noopener noreferrer" href={item.url + '/#customerReviews'} style={{margin: "6px 0 0 13px"}}>
                                                {item.reviews.total_reviews.toLocaleString()} Reviews
                                            </Link> */}
                                        </Row>

                                        {/* Product price */}
                                        <Row> 
                                            <Text style={{marginTop: '6px', marginBottom: 0, fontSize: '25px'}}>
                                                ${item.price.current_price}
                                            </Text>
                                            {item.price.savings_percent ? 
                                            <Row>
                                                <Text delete style={{ marginTop: '17px', marginLeft: '10px'}}>
                                                    ${item.price.before_price}
                                                </Text>
                                                <Text strong style={{color: '#ff4d4f', fontSize: '16px', marginTop: '14px', marginLeft: '5px'}}>
                                                    {Math.ceil(item.price.savings_percent)}% OFF
                                                </Text>
                                            </Row>
                                            : null}    
                                        </Row>

                                        {/* Product extra */}
                                        {/* {item.bestSeller ? 
                                            <Row style={{marginTop: '6px'}}> 
                                                <TrophyTwoTone twoToneColor="#ff4d4f" style={{fontSize: '20px'}} /> 
                                                <Text style={{marginLeft: '6px'}}>
                                                    Best Seller
                                                </Text>
                                            </Row>     
                                        : null}
                                        {item.amazonPrime ?                          
                                            <Row style={{marginTop: '6px'}}> 
                                                <CheckCircleTwoTone twoToneColor="#ff4d4f" style={{fontSize: '20px'}} /> 
                                                <Text style={{marginLeft: '6px'}}>
                                                    Fast Shipping
                                                </Text>
                                            </Row>     
                                        : null} */}
                                        <Row>
                                            <Link href="" target="_blank" style={{color: '#000000d9'}}>
                                                Compare prices on this product
                                            </Link>
                                        </Row>

                                        {/* Add to cart */}
                                        <Row style={{margin:'15px 0'}} >
                                            <Button 
                                                type="primary" 
                                                size='medium' 
                                            >
                                                <ShoppingCartOutlined style={{ fontSize: '19px', color: '#fff' }}/> Add to cart
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
                {data ? 
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
                            onClick={window.scrollTo(0, 0)}
                        />
                    </Row> 
                : null} 
                </Col>
            </Row>
        </>   
    )
}

export default Homepage;