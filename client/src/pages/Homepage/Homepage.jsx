import React, { useState, useEffect, useContext } from 'react';
import { Card, Col, Row, Typography, Rate, Button, Image } from 'antd';
import { ShoppingCartOutlined, CaretRightOutlined, CaretLeftOutlined } from '@ant-design/icons';
import { withRouter } from "react-router-dom";
import { AppContext } from "../../components/Context/Context";
import axios from 'axios';
import ReactPaginate from 'react-paginate';

// Components 
import SkeletonLoader from '../../components/SkeletonLoaders/SkeletonLoader';
import SiderNav from '../../components/SiderNav/SiderNav';
import PriceComparison from '../../components/ComparisonSearch/ComparisonSearch';

import './Homepage.css'

const { Paragraph, Text, Link, Title } = Typography;

const Homepage = ({ history }) => {
    const [offset, setOffset] = useState(1);
    const [data, setData] = useState('');
    const [perPage] = useState(10);
    const [pageCount, setPageCount] = useState(0)
    const { setSearch } = useContext(AppContext);

    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        const getData = async() => {
            try {      
                axios.get(`/api?page=${offset}`, { cancelToken: source.token })
                .then(res => {
                    const data = res.data;

                    const sliceData = data.slice(offset, offset + perPage)
                    setData(sliceData)
                    setPageCount(Math.ceil(data.length / perPage))
                });
            } catch (err) {
                if (axios.isCancel(err)) {
                    console.log("cancelled");
                } else {
                    console.error(err)
                }
            }
        }
        getData()
        return () => {
            source.cancel();
        };
    }, [offset, perPage])

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage + 1)
    };

    const handleSetSearch = (value) => {
        if (value !== '') {
            setSearch(value);
            history.push({
                pathname: '/search',
                search: `?q=${value}`
            })
        } else {
            return
        }
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
                                        {item.thumbnail || item.subThumbnail ?
                                            <> 
                                            {item.thumbnail ?
                                                <a target="_blank" rel="noopener noreferrer" href={item.url}>
                                                    <img src={item.thumbnail} 
                                                        alt={item.title} 
                                                        style={{width: '200px', height: '200px', objectFit: 'scale-down'}}
                                                    />
                                                </a>
                                                :
                                                <a target="_blank" rel="noopener noreferrer" href={item.url}>
                                                    <img src={item.subThumbnail} 
                                                        alt={item.title} 
                                                        style={{width: '200px', height: '200px', objectFit: 'scale-down'}}
                                                    />
                                                </a>
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

                                        {/* Compare Prices */}        
                                        <Row>
                                            <Link onClick={(() => handleSetSearch(item.title))} target="_blank" style={{color: '#000000d9'}}>
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

export default withRouter(Homepage);