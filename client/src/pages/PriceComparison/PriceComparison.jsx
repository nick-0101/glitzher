import React from 'react';
import { Col, Row, Typography, Divider, Button, Rate } from 'antd';
import { ShoppingOutlined, ShoppingCartOutlined } from '@ant-design/icons';

// Get search query from search component. If the 'query' param is empty 
// just redirect to homepage

import './PriceComparison.css'

const { Text, Title, Link } = Typography;

const PriceComparison = () => {
    return (
        <>
            <Divider /> 
            <Row style={{margin: '0 20%', paddingTop: '20px'}}>
                {/* Best Price Title */}
                <Title level={2} style={{margin:0}} className="column productTitle">iPhone X</Title>
                <Divider />
                {/* Product Image */}
                <Col flex="0 0 40%" className="column" className="column productImage"> 
                    <img src='http://placehold.it/308x308' alt="test"/>
                </Col>
                {/* Product Information */}
                <Col flex="0 0 60%" className="column productDetails">
                    <Row className="column productPrice">
                        <Col>
                            <Text>
                                The best price by <Link>Apple</Link>
                            </Text>
                            <Title level={3} style={{margin:0}}>$689.00</Title>
                        </Col>
                        {/* <Col style={{margin: 'auto 0', marginLeft: 'auto'}}>
                            <Button type="primary" size='medium' icon={<ShoppingOutlined/>} >
                                Buy Now
                            </Button>
                        </Col>     */}
                    </Row>
                    <Divider />
                    {/* Product reviews */}
                    <Row className="column productReviews">
                        <Title level={4} style={{marginRight: '10px', marginBottom: 0}}>4.5 / 5</Title>
                        <Rate disabled allowHalf defaultValue='4.5' style={{fontSize: '16px'}} />
                        <Link target="_blank" rel="noopener noreferrer" href={'/#customerReviews'} style={{margin: "6px 0 0 13px"}}>
                            1234 reviews
                        </Link>
                    </Row>
                    <Divider />
                    <Row justify="left">
                        <Button className="productButtons" type="primary" size='medium' icon={<ShoppingCartOutlined/>} style={{ marginBottom: '15px', height: '45px', fontSize: '16px'}}>
                            Add to cart
                        </Button>
                    </Row>
                    <Row justify="left">
                        <Button className="productButtons" type="primary" size='medium' icon={<ShoppingOutlined/>}  style={{height: '45px', fontSize: '16px'}}>
                            Buy Now
                        </Button>
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default PriceComparison







